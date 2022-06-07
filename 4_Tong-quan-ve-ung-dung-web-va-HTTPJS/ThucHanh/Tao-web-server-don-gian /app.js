const http=require('http');

let server =http.createServer((req, res) => {
    res.write('<h1>hello</h1><hr>');
    res.end();
})

server.listen(2080);
