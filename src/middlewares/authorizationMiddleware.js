const config = require('config');
const request = require('request-promise');
const errors = require('../domain/models/errors');

function buildRequest(req) {
    const options = {
        method: 'POST',
        uri: `${config.identityServerUrl}/user/validate`,
        body: {},
        json: true
    };

    if (req.header('Authorization')) {
        options.headers = {
            Authorization: req.header('Authorization'),
        };
    } else if (req.query.t) {
        options.uri = `${options.uri}?t=${req.query.t}`;
    } else {
        return undefined;
    }

    return options;
}

function authorizationMiddleware(secure = false) {
    return function (req, res, next) {
        if (secure) {
            const requestOptions = buildRequest(req);

            if (!requestOptions) {
                return next(new errors.AuthorizationError());
            }

            request(requestOptions)
                .then(function (data) {
                    req.authorizationToken = data.token;

                    next();
                })
                .catch(function (err) {
                    next(err);
                });
        } else {
            return next();
        }
    }
}

module.exports = authorizationMiddleware;