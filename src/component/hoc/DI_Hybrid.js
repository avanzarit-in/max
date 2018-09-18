// DI.js
import feathers from '@feathersjs/dist/feathers';
import rest from '@feathersjs/dist/rest';
import axios from 'axios';
import localstorage from 'feathers-localstorage';


const storage = {};
// Connect to the same as the browser URL (only in the browser)
const restClient = rest("/api");
const app = feathers();
var instance = axios.create({
    headers: {
        common: {
            'x-api-key': 'opensesame',
            'Content-Type': 'application/json'
        },
    },
});
app.configure(restClient.axios(instance));

/** REMOTE Services **/
const materialMasterRemoteService = app.service('material')
const customerMasterRemoteService = app.service('customer');
const stateMasterRemoteService = app.service('state');
const orderRemoteService = app.service('orders');


const materialServiceAfterFindHook = (context) => {
    return new Promise(resolve => {
        console.log("Checking Local Material Store if it has data")
        if (context.result.length === 0) {
            let promise = new Promise(resolve => {
                materialMasterRemoteService.find().then(remoteMaterials => {
                    let promises = [];

                    remoteMaterials.forEach(material => {
                        let promisecall = new Promise(resolve => {
                            materialMasterService.create(material).then(item => {
                                resolve();
                            });
                            promises.push(promisecall);
                        })
                    })

                    Promise.all(promises).then(result => {
                        resolve(remoteMaterials);
                    })

                });

            })

            promise.then(result => {
                console.log("All material populated");
                context.result = result;
                resolve(context);

            })
        }
        resolve(context);

    })




}




const customerServiceErrorFindHook = (context) => {
    if (context.error.code === 404) {
        customerMasterRemoteService.get(context.id).then(customer => {
            customerMasterService.create(customer);
            context.result = customer
        });
    }
}

const materialMasterServiceHooks = {
    after: {
        find: [materialServiceAfterFindHook],
    }
};

const customerMasterServiceHooks = {
    error: {
        get: [customerServiceErrorFindHook]
    }
};

/** LOCAL Services **/
const materialMasterServiceApp = feathers().use('/materialMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'materialMaster' }));
const customerMasterServiceApp = feathers().use('/customerMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'customerMaster' }));
const stateMasterServiceApp = feathers().use('/stateMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'stateMaster' }));
const orderServiceApp = feathers().use('/orders', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'orders' }));
const priceMasterServiceApp = feathers().use('/price', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'price' }));

const materialMasterService = materialMasterServiceApp.service('materialMaster').hooks(materialMasterServiceHooks);
const customerMasterService = customerMasterServiceApp.service('customerMaster').hooks(customerMasterServiceHooks);
const stateMasterService = stateMasterServiceApp.service('stateMaster');
const orderService = orderServiceApp.service('orders');
const priceMasterService = priceMasterServiceApp.service('price');



/**Expose Local Services **/
storage['materialMaster'] = materialMasterService;
storage['customerMaster'] = customerMasterService;
storage['stateMaster'] = stateMasterService;
storage['orders'] = orderService;
storage['priceMaster'] = priceMasterService;

export function get(key) {
    return storage[key];
}
