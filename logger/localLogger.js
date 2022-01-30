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
            //
            // - Write all logs with importance level of `error` or less to `error.log`
            // - Write all logs with importance level of `info` or less to `combined.log`
            //
            // new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'application.log' }),
            // new winston.transports.Console()
        ],
    });
}

module.exports = localLogger;
