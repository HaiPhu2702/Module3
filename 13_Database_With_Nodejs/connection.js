
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Matkhau1234@@',
    database: `test_connection`,
    charset: 'utf8_general_ci'
});

connection.connect(function (err) {
    if (err) {
        throw err.stack;
    }
    else
        console.log("connect success");
})

const sql= "Create table city (id int not null primary key auto_increment,name varchar(30) not null, zipcode varchar(6));";
connection.query(sql, function (err){
    if (err){
        console.log(err)
    }
    console.log("create table success")
})

const sql2="insert into city(name,zipcode) values('Ha Noi', '100000'),('T.P HCM','80000'), ('Da Nang', '50000'), ('Nam Dinh', '40000');";
connection.query(sql2,(err, result,fields) => {
    if (err) {
        console.log(err)
    }
    console.log("insert data success")
})

const allCity="select * from city"
connection.query(allCity,(err,result,fields)=>{
    if (err) {
        console.log(err)
    }
    console.log(result)
    console.log(fields)

})