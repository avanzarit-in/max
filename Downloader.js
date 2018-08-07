const puppeteer = require('puppeteer');

const Downloader = function() {
    puppeteer.launch().then(function(browser) {

        browser.newPage().then(function(page) {
            page.goto('http://127.0.0.1:5500/mypage.html').then(function() {

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
    }, function() {});
}

module.export.Downloader = Downloader
