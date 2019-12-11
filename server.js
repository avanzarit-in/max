const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();
const axios = require('axios')
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./dev.avanzarit.com.key'),
  cert: fs.readFileSync('./dev.avanzarit.com.crt')
};

app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/query', function(req, res) {
	console.log(req.query);
    let customerId = req.query.custId;
    let fromDate = req.query.fromDate;
    let toDate = req.query.toDate;
    let username = req.query.username;
    let password = req.query.password;

    console.log(customerId + "," + fromDate + "," + toDate);

    let url = "http://122.176.66.221:8000/sap/opu/odata/sap/ZCUST_LEDGER_SRV/ByCustomerIdFromDate?ID='" + customerId + "'&FromDate='" + fromDate + "'&FromTime='00:00:00'&$format=json";
    console.log(url);
    axios.get(url, {
        auth: {
            username: username,
            password: password
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
        result["balance"] = response.data.d.results[0]["CarryForwardBalance"];
        response.data.d.results.map(function(item, index) {
            if (index > 0) {
               let obj = [];
                obj.push(item["Reference"]);
                obj.push(item["ClearingDocumentNo"]);
                obj.push(item["DocumentDate"]);
                obj.push(item["Particulars"]);
                obj.push(item["Quantity"]);
                obj.push(item["Debit"]);
                obj.push(item["Credit"]);
                obj.push(item["CumulativeBalance"]);
                obj.push(item["Remarks"]);

                result["payload"][index - 1] = obj;
            }
        })
        res.send(result);
    }).catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            //console.log(error.request);
            console.log("No Response Received from Server " + error.message);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        //  console.log(error.config);
        res.sendStatus(500);
    });
});

https.createServer(options, app).listen(8080);

//app.listen(process.env.PORT || 8080, () => console.log("Server started on port 8080"));
