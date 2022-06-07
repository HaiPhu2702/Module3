var http = require('http');

var url = require('url');

var StringDecoder = require('string_decoder').StringDecoder;


http.createServer(function (req, res) {
    const parseUrl=url.parse(req.url,true)
    const queryStringObject = parseUrl.query;

    res.end('Hello Node Js');
    console.log(queryStringObject);
})
.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})