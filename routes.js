const express = require('express');
const router = express.Router();
const Joi = require('joi');
const loadStores = require('./data/stores');
const posDb = require('./services/posDbConnector');
const fetchOrder = require('./services/fetchOrder');
const logger = require('./logger/logger');
const config = require('./config');

/**
 * @swagger
 * components: 
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - id
 *         - releaseDate
 *       properties:
 *          id:
 *            type: string
 *            description: OrderId from the input
 *            example: '7017480851'
 *          dispatchDate:
 *            type: string 
 *            format: date-time
 *            example: '2016-08-29T09:12:33.001Z'
 */

// const schema = Joi.object({
//     orderId: Joi.string.required,
//     storeId: Joi.string.required
// })

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

/**
 * @swagger
 * /healthcheck:
 *  get:
 *      tags: 
 *        - monitoring
 *      summary: healthcheck for monitor
 *      operationId: healthCheck
 *      description: |
 *          Return the connection status to all POS systems
 *      responses:
 *          '200':
 *              description: Connectivity from the API middleware to POS systems is fine
 *          '503':
 *              description: Unable to retrieve data from POS
 */
router.get('/healthcheck', (req, res) => {
    logger.info('Application Health check');
    res.json({ 'message': 'Connectivity from the API middleware to POS systems is fine' });
});

/**
 * @swagger
 * /healthcheck/{storeId}:
 *  get:
 *      tags: 
 *        - monitoring
 *      summary: healthcheck for a specific POS system
 *      operationId: healthCheckPOS
 *      description: |
 *          Return the connection status from a specific POS system
 *      parameters:
 *        - in: path
 *          name: storeId
 *          schema:
 *              type: string
 *          required: true
 *          description: An unique store Id
 *      responses:
 *          '200':
 *              description: Connectivity from the API middleware to POS systems is fine
 *          '400':
 *              description: bad input parameter
 *          '404':
 *              description: Store Id not found
 *          '503':
 *              description: Unable to retrieve data from POS
 */
router.get('/healthcheck/:storeId', async function (req, res) {
    logger.info('Health check by storeId');

    var dbConfig = null;
    var storeNumber = req.params.storeId;
    try {
        var reqParam = typeof JSON.parse(storeNumber) === 'string';
        console.log("reqParam: ", reqParam);

        if (reqParam) {
            return res.status('400').json({
                'message': `Validation error - storeId is of type string but should be number`
            });
        } else {
            if (!runValidators(storeNumber)) {
                return res.status('400').json({
                    'message': `Validation error - storeId should be 4 digits`
                });
            }
        }
    } catch (err) {
        logger.error(`Cannot parse storeId provided`);
        return res.status('400').json({
            'message': `Validation error - Store Id not found`
        });
    }


    if (storeNumber != null)
        dbConfig = loadStores.findStoreDetails(storeNumber); // , port, username, password, database 

    console.log('config values : ', dbConfig);

    if (dbConfig.then(x => {

        if (x === "Not found") {
            res.status('404').json({ 'message': 'Store Id not found' });
        } else {
            const ip = x.ipAddress;
            const dbPort = x.port;
            const uname = x.username;
            const pwd = x.password;
            const dbName = x.database;

            const storeConn = posDb.connectToStore(ip, dbPort, uname, pwd, dbName);
            const results = fetchOrder.testQuery();
            results.then(ordSummary => {
                // console.log('ordSummary : {}', ordSummary);
                if (ordSummary == null) {
                    res.status('503').json({ 'message': 'Unable to retrieve data from POS' });
                } else {
                    res.status('200').json({ 'message': 'Connectivity from the API middleware to POS systems is fine' });
                }
            });
        }
    }));
});


/**
 * @swagger
 * /api/v1/order/{orderId}:/store/{storeId}:
 *  get:
 *      tags:
 *          - operations
 *      summary: searches order from the store POS system
 *      operationId: searchOrder
 *      description: |
 *          By passing in the appropriate options, you can search for
 *          order in the system
 *      parameters:
 *        - in: path
 *          name: orderId
 *          schema:
 *              type: string
 *          required: true
 *          description: search an order id from the system
 *        - in: path
 *          name: storeId
 *          schema:
 *              type: string
 *          required: true
 *          description: A unique id
 *      responses:
 *       '200':
 *         description: search results matching criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 *       '400':
 *         description: bad input parameter
 *       '404':
 *         description: Order not found
 *       '503':
 *         description: Unable to retrieve data from POS
 * 
 */


/* GET Order by Order number & StoreId */
router.get('/order/:orderId/store/:storeId', async function (req, res) {
    try {
        logger.info('Inside routes function');

        var ordNumber = req.params.orderId;
        var storeNumber = req.params.storeId;
        logger.info("order: %s ", ordNumber);
        logger.info("store: %s ", storeNumber);

        if (storeNumber != null)
            var dbConfig = loadStores.findStoreDetails(storeNumber); // , port, username, password, database 

        const ip = (await dbConfig).ipAddress;
        const dbPort = (await dbConfig).port;
        const uname = (await dbConfig).username;
        const pwd = (await dbConfig).password;
        const dbName = (await dbConfig).database;

        const storeConn = posDb.connectToStore(ip, dbPort, uname, pwd, dbName);
        const results = await fetchOrder.fetchOrderByNumber(ordNumber);
        logger.info('Get order by num');

        // validate.input(ordNumber, storeNumber);
        // validate request body against schema
        // const { error, value } = schema.validate(req.query, options);
        // if (error) {
        //     // on fail return comma separated errors
        //     next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        // } else {
        //     console.log(value);
        // on success invoke function to get Order details

    } catch (err) {
        logger.error(`Error while connecting to store `, err.message);
    }
});

module.exports = router;


const runValidators = function (paramObj) {
    var reg = new RegExp('^[0-9]{4}$');
    return reg.test(paramObj);
};