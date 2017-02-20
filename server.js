var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./data/db.json');
var middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});

// Use default router
server.use(router);
server.listen(4000, function () {
    console.log('JSON Server is running')
});