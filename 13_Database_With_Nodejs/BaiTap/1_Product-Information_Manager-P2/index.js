const mysql = require("mysql")
const  http = require("http")
const fs = require("fs");
const qs = require("qs");



const  connection=mysql.createConnection({
    location:"localhost",
    user: 'root',
    password: 'Matkhau1234@@',
    database: 'test_connection',
    charset:'utf8_general_ci'
})

connection.connect(err=>{
    if(err) throw err;
    else {
        console.log("Connect success")
    }
})


http.createServer(async(req, res)=>{

    try {
        if (req.method === 'POST' && req.url === "/product/add") {

            let buffer=[];

            for await (const chunk of req) {
                buffer.push(chunk)
            }


            const data = Buffer.concat(buffer).toString()
            const product=qs.parse(data)

            const sqlAdd=`insert into products(name,price) values('${product.name}','${parseInt(product.price)}')`

            connection.query(sqlAdd,(err, result,fields)=>{
                if(err) throw err;
                console.log("add success")
                res.writeHead(301,{
                    location: '/'
                })
                res.end()
            })

        } else {
            fs.readFile('./add.html', function (err, data) {
                if (err) {
                    throw err;
                }

                res.writeHead(200, {"Content-Type": "text/html"})
                res.write(data)
                res.end();
            })
        }
    } catch (e) {
        res.end(e.message)
    }
}).listen(8080,()=>{
    console.log("server listening http://localhost:8080")
})