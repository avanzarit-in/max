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


app.get('/api/statement', function(req, res) {
    let result = [];
    let customerId = req.query.customerId;
    let fromDateFormatted = req.query.fromDate;
    let toDateFormatted = req.query.toDate;
    let toDate = moment(toDateFormatted, "DD.MM.YYYY", true);
    console.log(customerId + "," + fromDateFormatted + "," + toDateFormatted);

    app.service('customer').get(customerId).then(customer => {
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

        app.service('/api/' + customerId).find({
            query: {
                $and: [{
                        "DD": { $gte: moment(fromDateFormatted, "DD.MM.YYYY", true).toDate() }
                    },
                    {
                        "DD": { $lte: moment(toDateFormatted, "DD.MM.YYYY", true).toDate() }
                    }

                ],
                $sort: {
                    DD: 1
                }
            }
        }).then(items => {
            items.forEach(item => {
                result.push(item);
            });

            if (toDate.isAfter(lastUpdateDate)) {
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
                            if (index > 0) {
                                let obj = {}
                                obj["R"] = item["Reference"];
                                obj["CD"] = item["ClearingDocumentNo"];
                                obj["DD"] = moment(item["DocumentDate"], 'YYYYMMDD', true).toDate();
                                obj["DDT"] = item["DocumentDate"];
                                obj["P"] = item["Particulars"];
                                obj["Q"] = item["Quantity"];
                                obj["D"] = item["Debit"];
                                obj["C"] = item["Credit"];
                                obj["CB"] = item["CumulativeBalance"];
                                obj["R"] = item["Remarks"];

                                result.push(obj);
                            }
                        })

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
                res.send(result);
            }
        })
    })
});





// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());


app.listen(3030);
