const http = require('http');
const url = require('url');
const fs = require('fs');


let server = http.createServer(function (req, res) {
    //get url and parse
    const parseUrl = url.parse(req.url, true);
    //
    // //get the path
    const path = parseUrl.pathname;
    const trimPath = path.replace(/^\/+|\/+$/g, '');

    const chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;

    chosenHandler(req,res);


});


server.listen(3000, function () {
    console.log('server running at localhost:3000 ')
});

const handlers = {};
// products page
handlers.products = function (req, res) {
    fs.readFile('./views/products.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
// handlers.users page
handlers.users = function (req, res) {
    fs.readFile('./views/users.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// not found
handlers.notFound = function (req, res) {
    fs.readFile('./views/notfound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

//definer the request router
const router = {
    'users': handlers.users,
    'products': handlers.products
}