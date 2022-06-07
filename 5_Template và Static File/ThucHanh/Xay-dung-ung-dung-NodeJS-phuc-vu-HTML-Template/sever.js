
const http= require('http');
const fs= require('fs');
let server=http.createServer((req, res) =>{
    fs.readFile('./views/index.html',"utf-8",(err, data)=>{
        if (err) {
            console.log(err)
        }
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(data)
        return res.end();
    })
})

server.listen('8080',function() {
    console.log("running")
})