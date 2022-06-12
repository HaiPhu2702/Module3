

const mysql = require("mysql")
const http = require("http");

const connection=mysql.createConnection({
    location: 'localhost',
    user: 'root',
    password: 'Matkhau1234@@',
    database: 'test_connection',
    charset: 'utf8_general_ci'
})

connection.connect(err=>{
    if (err) throw err;
    else {
        console.log("connect success")
        const sql="create table if not exists products(id int auto_increment primary key not null,name varchar(30) not null,price int not null)";
        connection.query(sql,(err, result)=>{
            if (err) {
                throw err;
            }
            console.log("table success")
        })
    }
})

http.createServer(async(req, res) => {
    try {
        if(req.url==='/product/create' && req.method==="POST"){
            const buffer=[]
            for await (const chunk of req){
                buffer.push(chunk)
            }
            const data = Buffer.concat(buffer).toString();
            const product=JSON.parse(data);
            const sqlAdd=`insert into product (name,price) values (${product.name} , ${parseInt(product.price)})`
            connection.query(sqlAdd,(err, result,fields)=>{
                if (err) {
                    throw err;
                }

                res.end(JSON.stringify(product))

            })
        }

    }catch (e) {
        res.end(e.message)
    }

}).listen(8080,()=>{
    console.log("server listening")
})