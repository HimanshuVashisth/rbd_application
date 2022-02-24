const details = require('../data/order');

var dispatchDetails = {
    dispatchReady: false,
    dispatchTime: null,
    message: null,
    statusCode: null
}


async function testQuery() {
    const testResults = await details.getTestOrder();

    return testResults;
}

async function fetchOrderByNumber(ordNumber) {
    const results = await details.getOrderByNum(ordNumber);

    if (results != null) {

        dispatchDetails.dispatchReady = true;
        dispatchDetails.dispatchTime = results;
        dispatchDetails.message = "Order is ready for pickup.";
        dispatchDetails.statusCode = 2000;

        res.json(dispatchDetails);
    } else {

        dispatchDetails.dispatchReady = false;
        dispatchDetails.dispatchTime = null;
        dispatchDetails.message = "Order is not ready yet.";
        dispatchDetails.statusCode = 2001;

        res.json(dispatchDetails);
    }

    return results;
}

module.exports = { testQuery, fetchOrderByNumber };
