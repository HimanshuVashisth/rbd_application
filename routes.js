const express = require('express');
const router = express.Router();
const details = require('./data/order');
const Joi = require('joi');
// const validate = require('./services/validate');

/**
 * @swagger
 * components: 
 *  schemas:
 *      status:
 *          type: string
 *          required:
 *              - orderId
 *              - storeId
 *          properties:
 *              orderId:
 *                  type: string
 *                  description: A unique id
 *              storeId:
 *                  type: string
 *                  description: A unique id
 *              status:
 *                  type: string
 *                  description: Order status
 *          example:
 *              orderId: 10386
 *              storeId: 141
 *              status: PENDING or READY
 */




const schema = Joi.object({
    orderId: Joi.number().min(5).required,
    storeId: Joi.number().min(3).required
})

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

/**
 * @swagger
 * /api/order/?{orderId}:/store/{storeId}:
 *  get:
 *      summary: The order status by OrderId and StoreId
 *      parameters:
 *        - in: query
 *          name: orderId
 *          schema:
 *              type: string
 *          required: true
 *          description: A unique id
 *        - in: query
 *          name: storeId
 *          schema:
 *              type: string
 *          required: true
 *          description: A unique id
 *      responses:
 *          200:
 *              description: The order status by OrderId and StoreId
 *              contents:
 *                  application/json
 *              schema:
 *                  $ref: '#/components/schemas/status'
 *          404:
 *              description: The order could not be found
 * 
 */


/* GET Order by Order number & StoreId */
router.get('/', async function (req, res) {
    try {
        const ordNumber = req.query.orderId;
        const storeNumber = req.query.storeId;

        // validate.input(ordNumber, storeNumber);
        // validate request body against schema
        // const { error, value } = schema.validate(req.query, options);
        // if (error) {
        //     // on fail return comma separated errors
        //     next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        // } else {
        //     console.log(value);
        // on success invoke function to get Order details
        const results = await details.getOrderByOrdNumStoreID(ordNumber, storeNumber);

        if (results.details != 0)
            res.json({ 'status': 'READY' });

        else
            res.json({ 'status': 'PENDING' });
        // }

        // next();

    } catch (err) {
        console.error(`Error while getting order details `, err.message);
    }
});

module.exports = router;
