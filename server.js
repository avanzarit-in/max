const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs')
const app = express();
const axios = require('axios')
app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/query', function (req, res) {
    let customerId=req.query.custId;
    let fromDate=req.query.fromDate;
    let toDate=req.query.toDate;
    console.log(customerId+","+fromDate+","+toDate);

    let url = "http://122.176.66.221:8000/sap/opu/odata/sap/ZCUST_LEDGER_SRV/ByCustomerIdFromDate?ID='" + customerId + "'&FromDate='" + fromDate + "'&FromTime='00:00:00'&$format=json";
    console.log(url);
    axios.get(url, {
        auth: {
            username: 'basis',
            password: 'gvil@2008'
        }/*,
        proxy: {
            host: 'kdc-proxy.wipro.com',
            port: 8080,
            auth: {
                username: 'spadhi',
                password: 'goa@2018'
            }
        }*/
    }).then(response => {
        result = {};
        result["payload"] = [];
        result["balance"] = response.data.d.results[0]["CarryForwardBalance"];
        response.data.d.results.map(function (item, index) {
            if (index > 0) {
                obj = [];
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
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            //console.log(error.request);
            console.log("No Response Received from Server "+error.message);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      //  console.log(error.config);
        res.sendStatus(500);
    });
});

app.get('/download', function (req, res) {
    console.log("downloader Called");
    puppeteer.launch().then(function (browser) {

        browser.newPage().then(function (page) {
            page.goto('http://localhost:3000/download').then(function () {

                page.pdf({
                    path: 'statement.pdf',
                    format: 'A4',
                    displayHeaderFooter: true,
                    headerTemplate: '<div style="font-size:10px">Page <span class="pageNumber" ></span>/<span class="totalPages"></span></div>',
                    footerTemplate: '<div style="font-size:10px">Page <span class="pageNumber" ></span>/<span class="totalPages"></span></div>',
                    margin: { top: '1cm', bottom: '1cm' }
                }).then(function () {
                    browser.close().then(function () {
                        console.log("Browser Closed");
                        var file = fs.readFileSync(__dirname + '/statement.pdf', 'binary');
                        res.setHeader('Content-Length', file.length);
                        res.setHeader('Content-disposition', 'attachment; filename=statement.pdf');
                        res.write(file, 'binary');
                        res.end();

                    });
                });
            })
        }, function (error) {

        })
    }, function (data) { console.log(data) });

    // res.send("Download Done");

});

app.get('/login', function (req, res) {
    console.log(req.params);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log("Server started on port 8080"));
