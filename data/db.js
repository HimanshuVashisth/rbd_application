const mysql = require('mysql2/promise');
const config = require('../config');
const logger = require('../logger/logger');

async function queryOrderByOrdNum(sql, params) {
    logger.info('Inside queryOrderByOrdNum');
    const connection = await mysql.createPool((await config.getConfig()).db);
    logger.info('created connection');
    const [results] = await connection.execute(sql, params);
    logger.info('executed results');

    logger.info('Data retreived');
    return results.length;
}

module.exports = {
    queryOrderByOrdNum
}

