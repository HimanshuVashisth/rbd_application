const fs = require('fs');
const yaml = require('js-yaml');
const config = require('../config');

async function findStoreDetails(storeNumber) {
    // Get document, or throw exception on error
    try {
        const fileContents = fs.readFileSync('Store_details.yaml', 'utf8');
        const data = yaml.load(fileContents);
        // Retrieve only 1 store information
        const store = data.findByValueOfObject("StoreId", parseInt(storeNumber));
        if (store.length > 0) {
            // Retrieve POS DB information for the store
            const ipAddress = store[0].IPAddress;
            const port = config.DB_PORT; //store[0].port;
            const username = config.DB_USER; //store[0].username;
            const password = config.DB_PASSWORD; //store[0].password;
            const database = config.DB_DATABASE; //store[0].database;

            return { ipAddress, port, username, password, database };
        } else {
            return "Not found"
        }

    } catch (err) {
        console.log(`Couldn't load store(s) details`, e);
    }

}

Array.prototype.findByValueOfObject = function (key, value) {
    return this.filter(function (item) {
        return (item[key] === value);
    });
}

module.exports = {
    findStoreDetails
}
