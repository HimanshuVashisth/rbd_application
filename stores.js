const fs = require('fs');
const yaml = require('js-yaml');

async function findStoreDetails(storeNumber) {
    // Get document, or throw exception on error
    try {
        const fileContents = fs.readFileSync('./data/Store_details.yaml', 'utf8');
        const data = yaml.load(fileContents);
        // Retrieve only 1 store information
        const store = data.findByValueOfObject("StoreId", parseInt(storeNumber));
        // Retrieve POS DB information for the store
        const ipAddress = store[0].IPAddress;
        const port = 3322; //store[0].port;
        const username = 'ramesh'; //store[0].username;
        const password = 'suresh' //store[0].password;
        const database = 'posdb103' //store[0].database;

        return { ipAddress, port, username, password, database };
    } catch (e) {
        console.log(e);
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
