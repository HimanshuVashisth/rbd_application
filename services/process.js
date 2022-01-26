const app = require('../server');

async function saveStoreValuesInProcessEnv(ip, port, uname, pwd, db) {
    console.log('Inside saveStoreValuesInProcessEnv');
    app.use(DB_HOST, ip);
    app.use(DB_PORT, port);
    app.use(DB_USER, uname);
    app.use(DB_PASSWORD, pwd);
    app.use(DB_NAME, db);
}

module.exports = {
    saveStoreValuesInProcessEnv
}
