const details = require('../data/order');

async function testQuery() {
    const testResults = await details.getTestOrder();

    return testResults;
}

async function fetchOrderByNumber(ordNumber) {
    const results = await details.getOrderByNum(ordNumber);

    if (results != null)
        res.json({ 'status': results });

    else
        res.json({ 'status': null });

    return results;
}

module.exports = { testQuery, fetchOrderByNumber };
