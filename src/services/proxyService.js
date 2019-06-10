const http = require('http');
const https = require('https');

const proxy = require('http-proxy-middleware');
const config = require('config');
const loggerService = require('./loggerService');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const httpKeepAliveAgent = new http.Agent({ keepAlive: true });
const httpsKeepAliveAgent = new https.Agent({ keepAlive: true });

const proxyConfig = config.proxy;

function addProxy(app, proxyConfig) {
    loggerService.debug(`Add proxy from ${proxyConfig.from} -> ${proxyConfig.to} (secured: ${proxyConfig.secure == true})`);

    const proxyOptions = {
        agent: (proxyConfig.to.startsWith('https')) ? httpsKeepAliveAgent : httpKeepAliveAgent,
        target: proxyConfig.to,
        preserveHeaderKeyCase: true,
        logLevel: config.logLevel,
        changeOrigin: true,
        ws: true,
        prependPath: false,
        pathRewrite: proxyConfig.pathRewrite || {},
    };

    // If marked as secure, we first contact the authentication/authorization (via the authorizationMiddleware) service and issue a private token
    proxyOptions.onProxyReq = function onProxyReq(proxyReq, req, res) {
        if (proxyConfig.secure) {
            proxyReq.setHeader('Authorization', `Bearer ${req.authorizationToken}`);            
        }
    }

    app.use(proxyConfig.from, authorizationMiddleware(proxyConfig.secure), proxy(proxyConfig.from, proxyOptions));
}



function initialize(app) {
    proxyConfig.forEach(proxy => addProxy(app, proxy));
}

module.exports = initialize;