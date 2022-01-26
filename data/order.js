const db = require('./db');
const config = require('../config');

async function getOrderByOrdNumStoreID(ordNumber) {
    const details = await db.queryOrderByOrdNumStoreID(
        'SELECT * FROM ORDERS WHERE SHIPPEDDATE IS NOT NULL AND ORDERNUMBER = ?',
        [ordNumber]
    );

    return {
        details
    }

}

module.exports = {
    getOrderByOrdNumStoreID
}
