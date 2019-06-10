# API Gateway

A central entry point for all the requests, it will route the request to the correct service.

## Install & run

```
npm i
npm start
```

## Configuration

For each environment, you need to provide a configuration for the proxy. Under the folder **config**, you can find one config file per environment. 
In the proxy array, add the route that you want to redirect.

```
{
    "from": "/",
    "to": "https://api-tst.aproplan.com/",
    "secure": false
}
```

The secure flag indicate that the call should be done by an authenticated user.