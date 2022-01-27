const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const genericRouter = require('./routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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
            contact: "Team Himanshu Nisha Dev Ninjas",
            url: "http://www.sas-it.com/support",
            email: "support@sasit.com"
        },
        servers: [
            {
                url: "http://localhost:3000"
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

app.use('/api/health', (req, res) => {
    res.json({ 'message': 'Order API Health ok' });
})

app.use('/api/order', genericRouter);

/* Error handler middleware */
app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});

app.listen(port, () => {
    console.info(`Order API listening at http://localhost:${port}`)
});

module.exports = {
    app
}
