const mysql = require('mysql2/promise');
const config = require('../config');
const logger = require('../logger/logger');

async function queryOrderByOrdNum(sql, params) {
    try {
        logger.info('Inside queryOrderByOrdNum');
        const connection = await mysql.createPool((await config.getConfig()).db);
        logger.info('created connection');

        const [results] = await connection.execute(sql, params);

        logger.info('Data retreived after execution');
        return results.length;
    } catch (err) {
        logger.error(`Error while connecting to store `, err.message);
    }

}

module.exports = {
    queryOrderByOrdNum
}

