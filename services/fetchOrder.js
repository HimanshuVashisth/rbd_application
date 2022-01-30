const details = require('../data/order');

async function fetchOrderByNumber(ordNumber) {
    const results = await details.getOrderByNum(ordNumber);

    if (results.details != 0)
        res.json({ 'status': 'READY' });

    else
        res.json({ 'status': 'PENDING' });

    return results;
}

module.exports = { fetchOrderByNumber };
