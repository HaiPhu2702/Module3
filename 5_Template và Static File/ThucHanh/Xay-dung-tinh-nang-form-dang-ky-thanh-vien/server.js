const http= require('http');
const fs= require('fs');
const qs = require("qs");

    http.createServer((req, res) => {

        if(req.method==='GET'){
            fs.readFile('./views/register.html', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err)
                }

                res.writeHead(200, {"Content-Type": "text/html"})
                res.write(data)
                res.end();
            })

        }else {
            let data ='';
            req.on('data',chunk => {
                data+=chunk;
            })
            req.on('end',() =>{
                const dataRegister=qs.parse(data);
                return res.end(`Register Succes with name: ${dataRegister.name}   email: ${dataRegister.email}   `);
            })
            req.on('error',() =>{
                console.log("error")            })
        }


    }).listen('8080', () => {
        console.log("running")
    })
