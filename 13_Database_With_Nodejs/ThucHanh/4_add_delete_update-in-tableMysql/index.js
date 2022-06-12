
const mysql = require('mysql')

let connection=mysql.createConnection({
    location:"location",
    user:"root",
    password:"Matkhau1234@@",
    database:"test_connection",
    charset:"utf8_general_ci"
})

connection.connect(err=>{
    if (err) {
        throw Error(err.message)
    }
    else {
        console.log("connection success")
        // const sqlTable="create table if not exists products(id int auto_increment primary key,name varchar(255),price int)"
        // connection.query(sqlTable,(err, result,fields)=>{
        //     if (err) {
        //         throw Error(err.message)
        //     }
        //     console.log("table success")
        // })

        //
        //     const sqlDropTable="drop table if exists products";
        // connection.query(sqlDropTable,(err, results)=>{
        //     if (err) {
        //         throw Error(err.message)
        //     }
        //     console.log("drop table success")
        //     }
        // )

        const addColumnAge="alter table customer add column age int default 30";
        connection.query(addColumnAge,(err, results)=>{
            if (err) {
                throw Error(err.message)
            }
            console.log("add column success")
        })

    }

})