const localLogger = require('./localLogger');

let logger = null;

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger = localLogger();
}

module.exports = logger;