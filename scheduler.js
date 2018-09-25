const feathers = require('@feathersjs/feathers');
const axios = require('axios');
const AWS = require('aws-sdk');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const moment = require('moment');

const customerDB = new NeDB({
    filename: './db-data/customer',
    autoload: true
});


const app = feathers();

app.hooks({
    error: async context => {
        console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
    }
});

app.use('customer', service({
    Model: customerDB
}));

const formatTime = (timeInText) => {
    timeInText = timeInText.replace(/^PT/, '').replace(/S$/, '');
    timeInText = timeInText.replace('H', ':').replace('M', ':');
    return timeInText;
}


app.service('customer').find().then(items => {
    items.forEach(item => {
        let customerId = item._id;
        let fromDate = moment([2017, 0, 1]).format('DD.MM.YYYY');
        let fromTime = "00.00.00";
        if (item.lastUpdateDate !== undefined) {
            fromDate = moment(item.lastUpdateDate, "DD/MM/YYYY", true).format("DD.MM.YYYY");
        }
        if (item.lastUpdateTime !== undefined) {
            fromTime = moment(item.lastUpdateTime, "hh:mm:ss", true).add(1, 's').format("hh.mm.ss");
        }
        let toDate = moment().format('DD.MM.YYYY');
        let toTime = moment().format('hh.mm.ss');
        console.log(customerId + "," + fromDate + "," + toDate);

        let url = "http://122.176.66.221:8000/sap/opu/odata/sap/ZCUST_LEDGER_SRV/ByCustomerIdFromDate?ID='" + customerId + "'&FromDate='" + fromDate + "'&FromTime='" + fromTime + "'&$format=json";
        console.log(url);
        axios.get(url, {
            auth: {
                username: 'basis',
                password: 'gvil@2008'
            }
            /*,
                    proxy: {
                        host: 'kdc-proxy.wipro.com',
                        port: 8080,
                        auth: {
                            username: 'spadhi',
                            password: 'goa@2018'
                        }
                    }*/
        }).then(response => {
            let result = {};
            result["payload"] = [];
            if (response !== undefined && response.data !== undefined && response.data.d !== undefined && response.data.d.results !== undefined && response.data.d.results[0] !== undefined) {
                const statementDB = new NeDB({
                    filename: './db-data/' + customerId,
                    autoload: true
                });

                app.use(customerId, service({
                    Model: statementDB
                }));

                result["balance"] = response.data.d.results[0]["CarryForwardBalance"];
                response.data.d.results.map(function(item, index) {
                    var dateTime = moment(item["DocumentDate"] + " " + formatTime(item["EntryTime"]), "YYYYMMDD HH:mm:ss", true).toDate();
                    if (moment(dateTime).isValid()) {
                        let obj = {}
                        obj["R"] = item["Reference"];
                        obj["CD"] = item["ClearingDocumentNo"];
                        obj["DN"] = item["DocumentNo"];
                        obj["DD"] = dateTime;
                        obj["DDT"] = moment(obj["DD"]).format("DD/MM/YYYY");
                        obj["P"] = item["Particulars"];
                        obj["Q"] = item["Quantity"];
                        obj["D"] = item["Debit"];
                        obj["C"] = item["Credit"];
                        obj["CB"] = item["CumulativeBalance"];
                        obj["RM"] = item["Remarks"];

                        app.service(customerId).create(obj);

                        result["payload"][index - 1] = obj;
                    }

                })
                console.log(customerId + "=>" + result["payload"].length + "=>" + result["balance"]);

                app.service('customer').patch(customerId, { lastUpdateDate: moment(toDate, "DD.MM.YYYY", true).format("DD/MM/YYYY"), lastUpdateTime: moment(toTime, "hh.mm.ss", true).format("hh:mm:ss") });
            }
        }).catch((error) => {

            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log("No Response Received from Server " + error.message);
            }
            else {

                console.log('Error', error.message);
            }
            console.log(error.config);

        });

    });
});
