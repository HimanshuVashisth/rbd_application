const db = require('./db');
const config = require('../config');

async function getOrderByOrdNumStoreID(ordNumber, storeNumber) {
    const details = await db.queryOrderByOrdNumStoreID(
        'SELECT * FROM ORDERS WHERE SHIPPEDDATE IS NOT NULL AND ORDERNUMBER = ? and CUSTOMERNUMBER = ? ',
        [ordNumber, storeNumber]
    );

    return {
        details
    }

}

module.exports = {
    getOrderByOrdNumStoreID
}
