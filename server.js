const express = require('express');
const bodyParser = require('body-parser');
const genericRouter = require('./routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const config = require('./config');
const logger = require('./logger/logger');

logger.info(`NODE_ENV=${config.NODE_ENV}`);

/**
 * Swagger
 * Extended: https://swagger.io/specification/#infoObject
 */
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order API",
            version: "1.0.0",
            description: "Order API using Express & NodeJs",
            contact: "Himanshu Dev Ninja",
            url: "http://www.sas-it.com/support",
            email: "support@sasit.com"
        },
        servers: [
            {
                url: `http://${config.HOST}:${config.PORT}`
            }
        ]
    },
    apis: ['./routes.js'],
}

const specs = swaggerJSDoc(options)

const app = express();

app.use("/swagger-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/api/v1', genericRouter);

/* Error handler middleware */
app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    logger.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});

app.listen(config.PORT, () => {
    logger.info(`Order API listening at http://${config.HOST}:${config.PORT}`)
});

module.exports = {
    app
}
