const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const auth = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const memory = require('feathers-memory');
const commonHooks = require('feathers-hooks-common');
const axios = require('axios');
const AWS = require('aws-sdk');
const apiKey = require('./apiKey');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const moment = require('moment');

const app = express(feathers());



app.configure(express.rest());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.configure(auth({ secret: 'secret' }));
app.configure(jwt());
app.configure(
    apiKey({
        header: 'x-api-key',
        allowedKeys: ['opensesame']
    })
);

app.use('/users', memory());

const authenticate = () =>
    commonHooks.iff(
        // if and only if the request is external
        commonHooks.every(commonHooks.isProvider('external')),
        commonHooks.iffElse(
            // if the specific header is included
            ctx => ctx.params.headers['x-api-key'],
            // authentication with this strategy
            auth.hooks.authenticate('apiKey'),
            // else fallback on the jwt strategy
            auth.hooks.authenticate(['jwt'])
        )
    );

app.hooks({
    before: {
        all: [authenticate()]
    }
});

app.hooks({
    error: async context => {
        console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
    }
});

const customerDB = new NeDB({
    filename: './db-data/customer',
    autoload: true
});

app.use('customer', service({
    Model: customerDB
}));

const appCustomerService= app.service('customer');

app.get('/api/customer', (req, res) => {
    let customerId = req.query.customerId;
    console.log("Fetch Custoer data for =>" + customerId);

    var promise = new Promise((resolve, reject) => {
        appCustomerService.get(customerId).then(customer => {
            resolve(customer)

        }).catch(error => {
            reject(error);});
    });

    promise.then(data => {


        res.send(data);
    }, err => {
        res.sendStatus(404);
    })

})

const formatTime = (timeInText) => {
    timeInText = timeInText.replace(/^PT/, '').replace(/S$/, '');
    timeInText = timeInText.replace('H', ':').replace('M', ':');
    return timeInText;
}

const computeCarryForwardBalance = (data) => {

    let broughtForwardBalance = 0;
    let debit = parseInt(data[0]["D"]);
    let credit = parseInt(data[0]["C"]);
    let cumelativeBalance = parseInt(data[0]["CB"]);

    if (debit === 0 && credit !== 0) {
        broughtForwardBalance = cumelativeBalance + credit;
    }
    else if (credit === 0 && debit !== 0) {
        broughtForwardBalance = cumelativeBalance - debit;
    }

    data.forEach(item => {
        item["CFB"] = broughtForwardBalance;

    })

    return data;
}

app.get('/api/statement', function(req, res) {
    let result = [];
    let reportType = req.query.reportType;
    let customerId = req.query.customerId;
    let fromDateFormatted = req.query.fromDate;
    let toDateFormatted = req.query.toDate;
    let toDate = moment(toDateFormatted + " 23:59:59", "DD.MM.YYYY HH:mm:ss", true);
    let fromDate = moment(fromDateFormatted + " 00:00:00", "DD.MM.YYYY HH:mm:ss", true);
    // console.log("fromDate =>" + fromDate.format("DD.MM.YYYY HH:mm:ss"));
    // console.log("tomDate =>" + toDate.format("DD.MM.YYYY HH:mm:ss"));
    console.log(customerId + "," + fromDateFormatted + "," + toDateFormatted);

    appCustomerService.get(customerId).then(customer => {
        let lastUpdateDateFormatted = moment([2017, 0, 1]).format('DD.MM.YYYY');
        let lastUpdateTimeFormatted = "00.00.00";


        if (customer.lastUpdateDate !== undefined) {
            lastUpdateDateFormatted = moment(customer.lastUpdateDate, "DD/MM/YYYY", true).format("DD.MM.YYYY");
        }

        let lastUpdateDate = moment(lastUpdateDateFormatted, "DD.MM.YYYY", true);

        if (customer.lastUpdateTime !== undefined) {
            lastUpdateTimeFormatted = moment(customer.lastUpdateTime, "hh:mm:ss", true).format("hh.mm.ss");
        }


        const statementDB = new NeDB({
            filename: './db-data/' + customerId,
            autoload: true
        });

        app.use('/api/' + customerId, service({
            Model: statementDB
        }));

        let query = "";
        if (reportType === "summary") {
            query = {
                $and: [{
                        "DD": { $gte: fromDate.toDate() }
                    },
                    {
                        "DD": { $lte: toDate.toDate() }
                    },
                    {
                        "CD": ""
                    }

                ],
                $sort: {
                    DD: 1
                }
            }

        }
        else if (reportType === "detail" || reportType === "download") {
            query = {
                $and: [{
                        "DD": { $gte: fromDate.toDate() }
                    },
                    {
                        "DD": { $lte: toDate.toDate() }
                    }
                ],
                $sort: {
                    DD: 1
                }
            }
        }

        app.service('/api/' + customerId).find({
            query: query
        }).then(items => {
            items.forEach(item => {
                result.push(item);
            });

            if (toDate.isSameOrAfter(lastUpdateDate)) {
                let url = "http://122.176.66.221:8000/sap/opu/odata/sap/ZCUST_LEDGER_SRV/ByCustomerIdFromDate?ID='" + customerId + "'&FromDate='" + lastUpdateDateFormatted + "'&FromTime='" + lastUpdateTimeFormatted + "'&$format=json";
                console.log(url);
                axios.get(url, {
                    auth: {
                        username: 'basis',
                        password: 'gvil@2008'
                    }

                }).then(response => {
                    if (response !== undefined && response.data !== undefined && response.data.d !== undefined && response.data.d.results !== undefined && response.data.d.results[0] !== undefined) {

                        response.data.d.results.map(function(item, index) {
                            var dateTime = moment(item["DocumentDate"] + " " + formatTime(item["EntryTime"]), "YYYYMMDD HH:mm:ss", true).toDate();
                            if (moment(dateTime).isValid() && moment(dateTime).isSameOrAfter(fromDate) && moment(dateTime).isSameOrBefore(toDate)) {
                                let obj = {}
                                obj["R"] = item["Reference"];
                                obj["CD"] = item["ClearingDocumentNo"];
                                obj["DN"] = item["DocumentNo"];
                                obj["DD"] = dateTime;
                                obj["DDT"] = moment(obj["DD"]).format("DD/MM/YYYY");
                                obj["TTT"] = item["EntryTime"];
                                obj["P"] = item["Particulars"];
                                obj["Q"] = item["Quantity"];
                                obj["D"] = item["Debit"];
                                obj["C"] = item["Credit"];
                                obj["CB"] = item["CumulativeBalance"];
                                obj["RM"] = item["Remarks"];
                                result.push(obj);
                            }
                        })
                    }
                    if (reportType === "download") {
                        result = computeCarryForwardBalance(result);
                    }
                    res.send(result);
                }).catch((error) => {
                    // Error
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

                    res.sendStatus(500);
                });
            }
            else {
                if (reportType === "download") {
                    result = computeCarryForwardBalance(result);
                }
                res.send(result);
            }
        })
    }).catch(error => {
        res.sendStatus(404);
    })
});

// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());

app.listen(3030);
