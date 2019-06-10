const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const request = require('request-promise');
const logger = require('./services/loggerService');

const app = express();

app.use(helmet());

// init the logger
logger.init('gateway', config.logs.logLevel);

// log the http calls and log with the logger service
app.use(morgan('combined', {
  stream: {
    write: message => logger.info(message)
  }
}));

app.use('/test', function (req, res, next) {
  return res.sendStatus(200);
});

app.use('/test-call', function (req, res, next) {
  var options = {
    uri: 'https://alphaaproplan-api.azurewebsites.net/rest/languages',    
    json: true // Automatically parses the JSON string in the response
  };

  request(options)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
});

// start the proxy
require('./services/proxyService')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // if the route was not a valid proxy
  res.sendStatus(404);
});

// error handler
app.use(function (err, req, res, next) {
  logger.error(err);

  if (err.name === 'Authorization') {
    err.statusCode = 403;
  }

  // render the error page
  res.sendStatus(err.statusCode || 500);
});

module.exports = app;