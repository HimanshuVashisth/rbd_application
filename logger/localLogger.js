const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const localLogger = () => {
    return winston.createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            myFormat
        ),
        defaultMeta: { service: 'order-service' },
        transports: [
            new winston.transports.File({ filename: 'application.log' }),
            // new winston.transports.Console()
        ],
    });
}

module.exports = localLogger;
