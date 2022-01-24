const mysql = require('mysql2/promise');
const config = require('../config');

async function queryOrderByOrdNumStoreID(sql, params) {
    const connection = await mysql.createPool(config.db);
    const [results] = await connection.execute(sql, params);

    return results.length;
}

module.exports = {
    queryOrderByOrdNumStoreID
}

