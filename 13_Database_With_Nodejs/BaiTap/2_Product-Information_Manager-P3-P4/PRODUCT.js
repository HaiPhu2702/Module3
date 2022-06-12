const http = require('http');
const mysql = require('mysql');
const fs = require("fs");
const url = require("url");
const qs = require("qs");

const connection = mysql.createConnection({
    location: "localhost",
    user: 'root',
    password: 'Matkhau1234@@',
    database: 'test_connection',
    charset: "utf8_general_ci"
})

connection.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("connection success")
    }
})

function showListProduct(product) {
    let html = '';
    for (let i = 0; i < product.length; i++) {
        html += '<tr>';
        html += `<td>${i + 1}</td>`
        html += `<td>${product[i].name}</td>`
        html += `<td>${product[i].price}</td>`
        html += `<td><a href="product/delete?id=${i}" class="btn btn-danger">Delete</a></td>`
        html += `<td> <a href="product/update?id=${i}" class="btn btn-primary">Update</a></td>`
        html += '</tr>';
    }
    return html;
}

// let handlers={};
// handlers.add=function (req, res) {
//
// }


http.createServer(async (req, res) => {

    const urlPath = url.parse(req.url, true)
    let queryString = urlPath.query;
    try {
        switch (urlPath.pathname) {

            case '/':
                fs.readFile("./html/PRODUCT.html", "utf8", (err, data) => {
                        res.writeHead(200, "utf8", {"Content-Type": "text/html"})

                        const sqlALLProduct = `select * from products`
                        connection.query(sqlALLProduct, (err, results, fields) => {
                            if (err) {
                                throw err
                            }
                            let html = showListProduct(results)
                            data = data.replace('{tbody}', html)
                            res.write(data);
                            return res.end();
                        })
                    }
                )
                break;


            case '/product/update':
                let idUpdate = eval(queryString.id + 1);
                console.log(idUpdate)


                if (req.method === "GET") {
                    fs.readFile("./html/UPDATE.html", (err, data) => {
                        if (err) {
                            throw err;
                        }
                        res.writeHead(200, "utf8", {"Content-Type": "text/html"})
                        res.write(data)
                        return res.end()
                    })
                } else {
                    console.log(idUpdate)
                    let buffer = [];

                    for await (const chunk of req) {
                        buffer.push(chunk)
                    }
                    const data = Buffer.concat(buffer).toString()
                    const dataUpdate = qs.parse(data);

                    const sqlUpdate = ` 
                                        update products 
                                        set name='${dataUpdate.name}',
                                        price='${dataUpdate.price}'
                                        where id = 1
                                        `
                    await connection.query(sqlUpdate, (err, result, fields) => {
                        if (err) {
                            throw Error(err.message)
                        } else {
                            console.log("update success")
                            res.writeHead(301, {
                                Location: "http://localhost:8080"
                            })
                            res.end()
                        }
                    })

                }
                break;


            case '/product/delete':
                const idDelete = queryString.id;
                const sqlDeleteProductById = `delete from products where id='${idDelete}'`
                connection.query(sqlDeleteProductById, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("delete success");
                        res.writeHead(301, {
                            Location: "http://localhost:8080"
                        })
                        res.end()
                    }
                })
                break;


            case '/product/add':
                if (req.method === "GET") {
                    fs.readFile("./html/ADD.html", (err, data) => {
                        if (err) {
                            throw err;
                        }
                        res.writeHead(200, "utf8", {"Content-Type": "text/html"})
                        res.write(data)
                        return res.end()
                    })
                } else {

                    let buffer = [];

                    for await (const chunk of req) {
                        buffer.push(chunk)
                    }
                    const data = Buffer.concat(buffer).toString()
                    const dataAdd = qs.parse(data);
                    console.log(dataAdd.name, dataAdd.price)
                    console.log(typeof  dataAdd.name,typeof parseInt(dataAdd.price))

                    const sqlAdd = ` insert into products(name, price)
                                      values ('${dataAdd.name}','${parseInt(dataAdd.price)}')`
                    await connection.query(sqlAdd, (err, result, fields) => {
                        if (err) {
                            throw Error(err.message)
                        } else {
                            console.log("add success")
                            res.writeHead(301,{
                                location:"/"

                            })
                            res.end()
                        }
                    })

                }

                break;


            case '/product/search':
                if(req.method ==='POST'){
                    let buffer = [];

                    for await (const chunk of req) {
                        buffer.push(chunk)
                    }
                    const data = Buffer.concat(buffer).toString()
                    const dataSearch= (qs.parse(data)).name;

                    //tìm trả về mảng chứa  dataSearch
                    const sqlALLProduct = `select * from products`
                    connection.query(sqlALLProduct, (err, results) => {
                            if (err) {
                                throw err
                            }
                            let ArrSearch = []
                        console.log(results)
                            for (let i = 0; i < results.length; i++) {
                                if (results[i].name === dataSearch) {
                                    ArrSearch.push(results[i])
                                }
                            }
                            //tra ve mang ArrSearch nhưng có phần thông báo ở trong bằng chữ để loại bỏ chữ thì
                            const resultArray = Object.values(JSON.parse(JSON.stringify(ArrSearch)))

                            //Hiển thị
                            fs.readFile("./html/PRODUCT.html", "utf8", (err, data) => {
                                res.writeHead(200, "utf8", {"Content-Type": "text/html"})

                                let html = showListProduct(resultArray)
                                data = data.replace('{tbody}', html)
                                data = data.replace('<a href="/" hidden>Back</a>', '<a href="/" >Back</a>')

                                res.write(data);
                                return res.end();
                            })

                        }
                    )
                }
                break;
        }
    } catch (e) {
        if (e) {
            throw e;
        }
        res.end();
    }

}).listen(8080, () => {
    console.log("server listening http://localhost:8080")
})