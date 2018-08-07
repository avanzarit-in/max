const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/download', function(req, res) {
    console.log("downloader Called");
    puppeteer.launch().then(function(browser) {

        browser.newPage().then(function(page) {
            page.goto('https://google.com').then(function() {

                page.pdf({
                    path: 'hn.pdf',
                    format: 'A4',
                    displayHeaderFooter: true,
                    headerTemplate: '<div style="font-size:10px">Page <span class="pageNumber" ></span>/<span class="totalPages"></span></div>',
                    footerTemplate: '<div style="font-size:10px">Page <span class="pageNumber" ></span>/<span class="totalPages"></span></div>',
                    margin: { top: '1cm', bottom: '1cm' }
                }).then(function() {
                    browser.close().then(function() {
                        console.log("Browser Closed");
                    });
                });
            })
        }, function(error) {

        })
    }, function(data) { console.log(data) });

    res.send("Download Done");

});

app.get('/login', function(req, res) {
    console.log(req.params);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log("Server started on port 8080"));