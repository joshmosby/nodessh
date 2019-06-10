const config = require('config');
const winston = require('winston');
const {
    AzureApplicationInsightsLogger
} = require('winston-azure-application-insights');

let logger;

function init(serviceName, level = 'debug') {
    const transports = [
        // write all the error in error.log
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            handleExceptions: true,
            timestamp: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
        }),
        // write all logs to combined.log
        new winston.transports.File({
            filename: 'combined.log',
            handleExceptions: true,
            timestamp: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
        }),
        // write everything in the console
        new winston.transports.Console({
            format: winston.format.simple(),
            handleExceptions: true,
            timestamp: true,
            json: false,
            colorize: true,
        })
    ];

    if (config.has('logs.insightKey') && config.logs.insightKey) {
        transports.push(new AzureApplicationInsightsLogger({
            key: config.logs.insightKey,
        }))
    }

    logger = winston.createLogger({
        level,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        defaultMeta: {
            service: serviceName,
        },
        transports: transports,
        exitOnError: false,
    });
}

function validateLogger() {
    if (!logger) {
        throw new Error('Invalid Logger, did you forget to call init()?');
    }
}

function info(message) {
    validateLogger();
    logger.info(message);
}

function debug(message) {
    validateLogger();
    logger.debug(message);
}

function warn(message) {
    validateLogger();
    logger.warn(message);
}

function error(message, err) {
    validateLogger();
    logger.error(message, {
        err,
    });
}

module.exports = {
    init,
    info,
    debug,
    warn,
    error,
}