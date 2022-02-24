const db = require('./db');

async function getTestOrder() {
    const ordSummary = await db.queryOrderByOrdNum(
        'SELECT * FROM ORDERS where ROWNUM = 1'
    );

    return (ordSummary != null) ? ordSummary : null;
}

async function getOrderByNum(ordNumber) {
    const details = await db.queryOrderByOrdNum(
        'SELECT SHIPPEDDATE FROM ORDERS WHERE ORDERNUMBER = ?',
        [ordNumber]
    );

    return {
        details
    }

}

module.exports = {
    getTestOrder, getOrderByNum
}
