const http= require('http');
const url= require('url');
const  StringDecoder=require('string_decoder').StringDecoder;

http.createServer((req, res) => {
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        res.end('Hello Node Js');
        console.log(buffer);
    });
})
.listen('8080',()=>{
    console.log("running server")
})