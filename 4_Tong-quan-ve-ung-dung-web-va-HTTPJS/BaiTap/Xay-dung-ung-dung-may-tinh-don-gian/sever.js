const http= require('http');
const fs = require("fs");
const qs = require("qs");

let server=http.createServer((req, res) =>{
        if(req.method==="GET"){
            fs.readFile('calutor.html','utf8',(err, data)=>{
                if(err) throw err;
                res.writeHead(200,'utf8',{ContentType: 'text/html'})
                res.write(data)
                return res.end()
            })
        }else {
            let data ='';

            req.on('data',chunk => {
                data+=chunk;
            })
            req.on('end',()=>{
                const result=qs.parse(data);
                fs.readFile('result.html','utf-8',(err, data)=>{
                    if(err) throw err;
                    data=data.replace('0',result.name)
                    res.writeHead(200,{ContentType: 'text/html'})
                    res.write(data)
                    return res.end();
                })
            })
            req.on('error', () => {
                console.log('error')
            })
        }

})

server.listen('7645','localhost',()=>{
    console.log('runnings')
})
