const http = require('http');
const fs = require('fs');
const qs = require("qs");

http.createServer((req, res)=>{
    const method = req.method;
    const url = req.url;
    if(method==="POST" && url==='/product'  ){
        let data='';
        req.on("data",chunk => {
                data+=chunk;
            }
        )
        req.on("end",()=>{
            data =qs.parse(data);


            fs.writeFile("./data/product.txt",[data.name,data.price],err => {
                if(err) {
                    console.log(err)
                    return
                }
                res.writeHead(200,'utf-8',{"Content-Type":"text/html"})
                res.write("success </br>")
                res.write("<a href='/'>QuayLai</a>")
                return  res.end();
            })

        })
        req.on("error",()=>{
            console.log("error")
        })



    }else {
        fs.readFile('./views/product.html',"utf8",function(err,data){
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            return  res.end();
        })

    }

})
.listen("8080", ()=>{
    console.log("server listening")
})