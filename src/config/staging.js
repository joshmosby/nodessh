module.exports = {
    proxy: [{
        from: '/',
        to: 'http://api-stg.aproplan.com/',
        secure: false
    }]
};
