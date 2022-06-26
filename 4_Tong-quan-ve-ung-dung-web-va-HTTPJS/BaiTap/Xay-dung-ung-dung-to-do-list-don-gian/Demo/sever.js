const http=require('http');
const fs=require('fs');
const qs = require("qs");

const sever=http.createServer((req, res) => {
    if(req.method==='GET'){
        fs.readFile('list.html', 'utf8',(err, data) => {
            if (err) {
                console.log(err.message)
            }
            res.writeHead(200, 'utf-8', {'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        })
    }else{
        let data ='';
        req.on('data',chunk => {
            data+=chunk;
        })
        req.on('end',()=>{
            const  demo=qs.parse(data);
            fs.readFile('login.html', 'utf-8',function (err, data) {
                if (err) {
                    console.log(err)
                }
                data= data.replace('{name}', demo.name);
                res.writeHead(200,{'Context-Type':'text/html'})
                res.write(data)
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })

    }


})

sever.listen('8080','localhost',()=> {
    console.log("sever 8080")
})