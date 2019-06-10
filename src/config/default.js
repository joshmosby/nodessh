module.exports = {
    logs: {
        logLevel: process.env.LOGS_LOGLEVEL || 'debug',
        insightKey: process.env.LOGS_INSIGHT_KEY || '',
    },
    identityServerUrl: 'http://localhost:5000',
    proxy: [
        // {
        //     from: ['/identity/user/login', '/identity/user/logout', '/identity/user/logout-all'],
        //     to: 'http://localhost:5000/',
        //     pathRewrite: {
        //         '^/identity': '/'
        //     },
        //     secure: false
        // },
        // {
        //     from: ['/identity/**', '!/identity/user/validate'],
        //     to: 'http://localhost:5000/',
        //     pathRewrite: {
        //         '^/identity': '/'
        //     },
        //     secure: true
        // },
        // {
        //     from: ['/rest/**'],
        //     to: 'https://alphaaproplan-api.azurewebsites.net/',
        //     secure: true
        // },
        // {
        //     from: ['/**'],
        //     to: 'https://alphaaproplan-api.azurewebsites.net/',
        //     secure: false
        // }
    ]
}