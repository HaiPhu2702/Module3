

const mysql = require('mysql')

const connection=mysql.createConnection({
    location:"localhost",
    user: 'root',
    password: 'Matkhau1234@@',
    database: 'test_connection',
    charset:"utf8_general_ci"
})

connection.connect(err => {
    if (err) {
        throw err
    }else {
        console.log("connection success")
        const sqlInsert=`insert into customer(name,address) values('Ngô Ngọc Bằng', 'Hà Nội')`;
        connection.query(sqlInsert,(err, result) =>{
            if (err) {
                throw err;
            }
            console.log(result)

        })

        const sqlUpdate = `update customer set address= 'Hải Dương' WHERE name = 'hung'`

        connection.query(sqlUpdate, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });


    }
})
