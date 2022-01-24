const request = require('supertest')
const app = require('../server')

describe('Get Endpoint', () => {
    try {
        it('should get order status', async () => {
            const res = await request(app)
                .get('/api/order')
            // .query({ 'orderId': 1, 'storeId': 1 })

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
        })
    }
    catch (err) {
        console.log("Exception : ", err)
    }
})