"use strict";
const axios = require("axios");

exports.handler = async function(event, context, callback) {
  console.log(JSON.parse(event.body));
  var data = JSON.parse(event.body);
  var username = data.username;
  var password = data.password;
  var customerId = data.customerId;
  var fromDate = data.fromDate;
  var res = {};

  let url =
    "http://122.176.66.221:8000/sap/opu/odata/sap/ZCUST_LEDGER_SRV/ByCustomerIdFromDate?ID='" +
    customerId +
    "'&FromDate='" +
    fromDate +
    "'&FromTime='00.00.00'&$format=json";
  console.log(url);

  try {
    const response = await axios.get(url, {
      auth: {
        username: username,
        password: password
      }
    });

    console.log(response);
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
    });
    console.log(result);

    res = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(result)
    };
    return res;
  } catch (error) {
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
      console.log("No Response Received from Server " + error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    res = {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(error)
    };
    return res;
  }
};
