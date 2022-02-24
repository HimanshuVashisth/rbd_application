const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

async function getConfig(ip, dbPort, uname, pwd, dbName) {
    const config = {
        db: {
            host: ip,
            port: dbPort,
            user: uname,
            password: pwd,
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }
    }

    return config;
}

module.exports = {
    getConfig,
    NODE_ENV: process.env.NODE_ENV || 'local',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_NAME,
    token: process.env.JWT_TOKEN
};
