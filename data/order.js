const db = require('./db');

async function getOrderByNum(ordNumber) {
    const details = await db.queryOrderByOrdNum(
        'SELECT * FROM ORDERS WHERE SHIPPEDDATE IS NOT NULL AND ORDERNUMBER = ?',
        [ordNumber]
    );

    return {
        details
    }

}

module.exports = {
    getOrderByNum
}
