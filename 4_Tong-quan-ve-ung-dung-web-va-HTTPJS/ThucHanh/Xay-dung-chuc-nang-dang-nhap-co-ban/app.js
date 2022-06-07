
const http=require("http");

http.createServer((req, res) => {
    let txt=""
    if (req.url==='/login'){
        txt='login success';
    }else {
        txt='login error';
    }
    res.end(txt)
}).listen(8080,'localhost')