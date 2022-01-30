const config = require('../config');

async function connectToStore(ip, dbPort, uname, pwd, dbName) {
    return config.getConfig(ip, dbPort, uname, pwd, dbName);
}

module.exports = {
    connectToStore
};