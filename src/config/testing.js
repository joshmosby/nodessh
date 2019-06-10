module.exports = {
    proxy: [{
        from: '/',
        to: 'https://alphaaproplan-api.azurewebsites.net/',
        secure: false
    }]
};
