const mysql = require("mysql")
const connection = mysql.createConnection({
    location: 'localhost',
    user: 'root',
    password: 'Matkhau1234@@',
    database: 'test_connection',
    charset: 'utf8_general_ci'
})

connection.connect((err) => {
    if (err) {
        throw Error(err.message)
    }

})


const sqlSelect = 'SELECT * FROM customer';
connection.query(sqlSelect, (err, result) => {
    if (err) {
        throw Error(err.message)
    }
    console.log(result)
})

const sqlWhere = 'SELECT * FROM customer WHERE address="THAI BINH" '
connection.query(sqlWhere, (err, results,fields) => {
    if (err) {
        throw Error(err.message)
    }
    console.log(results)
})

const sqlLimit = 'SELECT * FROM customer limit 3'
connection.query(sqlLimit, (err, results)=>{
    if (err) {
        throw Error(err.message)
    }
    console.log(results)
})