const dotenv = require('dotenv');
const path = require('path');

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || '172.17.0.1',
        port: env.DB_PORT || '3306',
        user: env.DB_USER || 'root',
        password: env.DB_PASSWORD || 'root1234',
        database: env.DB_NAME || 'classicModels',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};

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
    DB_DATABASE: process.env.DB_NAME
};
