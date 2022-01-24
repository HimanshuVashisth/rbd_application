const env = process.env;

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || 'localhost',
        user: env.DB_USER || 'root',
        password: env.DB_PASSWORD || 'root1234',
        database: env.DB_NAME || 'classicModels',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;