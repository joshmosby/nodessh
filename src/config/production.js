module.exports = {
    proxy: [{
        from: '/',
        to: 'https://api.aproplan.com/',
        secure: false
    }]
};
