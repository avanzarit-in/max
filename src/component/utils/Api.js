import axios from 'axios';
import data from './../data/Data.json'

const Api = (() => {

    let processError = (error) => {
        let errorData = {};
        if (error.response) {
            errorData.type = "response";
            errorData.data = error.response.data;
            errorData.status = error.response.status;
            errorData.header = error.response.headers
        } else if (error.request) {
            errorData.type = "request";
            errorData.request = error.request;
        } else {
            errorData.type = "others";
            errorData.message = error.message;
        }
console.log(errorData);
        return errorData;
    }

    this.fetchStatementData = (customerId, reportType, fromDate, toDate) => {
     return new Promise((resolve, reject) => {
            axios.get('http://max-1383804388.us-east-1.elb.amazonaws.com/api/statement',
                {
                    params:
                    {
                         customerId: customerId,
                        fromDate: fromDate,
                        toDate: toDate,
                        reportType: reportType
                    },
                },
                {
                    headers:
                    {
                        "x-api-key": "opensesame",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    console.log(res);
                    resolve(res.data);
                }).catch((error) => {
                     console.log(processError(error));
                    resolve(data);
                });
        })
    }

    this.getCustomer = (customerId) => {
        return new Promise((resolve, reject) => {
            axios.get('http://max-1383804388.us-east-1.elb.amazonaws.com/api/customer',
                {
                    params:
                    {
                        customerId: customerId
                    },
                },
                {
                    headers:
                    {
                        "x-api-key": "opensesame",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    console.log(res);
                    resolve(res.data.name);
                }).catch((error) => {
                    console.log(processError(error));
                    resolve("Some Name");
                });
        })
    }

    return this;
})();

export default Api;