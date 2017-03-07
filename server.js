const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});

server.use((req, res, next) => {
    if (req.method === 'GET') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    setTimeout(next, 1500);
});

// Use default router
server.use(router);
server.listen(4000, () => console.log('JSON Server is running'));