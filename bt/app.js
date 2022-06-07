const http = require('http');
const url = require('url');
const fs = require('fs');
const {malformedMultipart} = require("formidable/src/FormidableError");
const qs = require("qs");

let users = [
    {
        name: 'Tai',
        email: 'tai@gmial.com',
        phone: '090909090'
    },
    {
        name: 'Tai 2',
        email: 'tai2@gmial.com',
        phone: '090909090'
    },
    {
        name: 'Tai 3',
        email: 'tai3@gmial.com',
        phone: '090909090'
    },
]



function showListUser(data) {
    let html = '';
    for (let i = 0; i < data.length; i++){
        html += '<tr>';
        html += `<td>${i + 1}</td>`
        html += `<td>${data[i].name}</td>`
        html += `<td>${data[i].email}</td>`
        html += `<td>${data[i].phone}</td>`
        html += `<td><a href="users/delete?id=${i}" class="btn btn-danger">Delete</a></td>`
        html += '</tr>';
    }
    return html;
}

function search(keyword) {
    return users.filter((item, index) => {
        return item.name.toLowerCase() === keyword.toLowerCase()
    })
}

function deleteUser(index) {
    users.splice(index, 1);
    return users;
}

// tạo server
const server = http.createServer(((req, res) => {

    // phân tích url
    const urlPath = url.parse(req.url, true);
    let queryString = urlPath.query;

    // dùng switch-case điều hướng  theo url và method của request
    // nó đóng vai trò là router

    switch (urlPath.pathname) {
        case '/':
            fs.readFile('./views/index.html','utf8', ((err, data) => {
                if (err) {
                    console.log(err);
                }

                let newData = showListUser(users);
                data = data.replace('{list-user}', newData)
                res.writeHead(200,'success', {'Content-type': 'text/html'})
                res.write(data)
                res.end()
            }))
            break;
        case '/search':
            let keyword = queryString.name;
            let dataSearch = search(keyword);
            fs.readFile('./views/index.html','utf8', ((err, data) => {
                if (err) {
                    console.log(err)
                }

                let newData = showListUser(dataSearch);

                data = data.replace('{list-user}', newData)

                data = data.replace('<a href="" hidden></a>', '<a href="/">Back</a>')

                res.writeHead(200,'success', {'Content-type': 'text/html'})
                res.write(data)

                res.end()
            }))
            break;
        case '/users/delete':
            let index = queryString.id;
            deleteUser(index);

            // set lại location cho res để trình duyệt gọi lên 1 request khác
            res.writeHead(301, {
                Location: "http://localhost:8000"
            })

            res.end()
            break;

        case '/add':
            const method = req.method;
            let index1 = queryString.id;

           // let  usersUpdate=users[index1]

            const url = req.url;
            if(method==='GET'){
                fs.readFile('./views/add.html','utf-8',(err, data)=>{
                    if (err) {
                        console.log(err)
                    }
                    data.replace('<form action="/add" method="post">','<form action="/add" method="post">\n')
                    res.writeHead(200,'success', {'Content-type': 'text/html'})
                    res.write(data)
                    return res.end()
                })
            }else{
                   let data='';

                   req.on('data',chunk=>{
                       data+=chunk;
                   })
                   req.on('end',(data)=>{
                           data=qs.parse(data);
                           console.log(data)
                           // let html=showListUser(data);
                       }
                   )
                   req.on('error',()=>{
                       console.log("error")
                   })
               }



            break;
    }

}))

server.listen(8000, 'localhost', () => {
    console.log('server running in http://localhost:8000')
})