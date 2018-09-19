const feathers = require('@feathersjs/feathers');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const customer_data = require('./data/customer.json');

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


app.service('customer').find().then(items => {
    items.forEach(item => {
        app.service('customer').remove(item._id);
    });
    customer_data.forEach((item) => {
        app.service('customer').create(item);
    });
});
