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
        html += `<td>
                       <a href="users/delete?id=${i}" class="btn btn-danger">Delete</a>
                       <a href="users/update?id=${i}" class="btn btn-primary">Update</a>
                  </td>`
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
    let index;
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
            fs.readFile('./views/list.html','utf8', ((err, data) => {
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
             index = queryString.id;
            deleteUser(index);

            // set lại location cho res để trình duyệt gọi lên 1 request khác
            res.writeHead(301, {
                Location: "http://localhost:8002"
            })

            res.end()
            break;

        case '/users/add':
            const method = req.method;
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
            }else {
                let data='';
                req.on('data',chunk => {
                    data+=chunk;
                })
                req.on("end",()=>{
                    data=qs.parse(data);

                    let userAdd={
                        name:data.name,
                        email:data.email,
                        phone:data.phone
                    }
                    users.push(userAdd);

                    res.writeHead(301,{
                        Location:"http://localhost:8002"
                    })
                    res.end();
                })
            }

            break;
        case '/users/update':

             index=queryString.id;
            // can sua user[index1]
            let userUpdate=users[index];

            //hien thi giao dien

            if(req.method==="GET"){
                fs.readFile('./views/edit.html',"utf-8",(err, data)=>{
                    if (err){
                        console.log(err.message)
                    }

                    data=data.replace('value="name"',
                        `value="${userUpdate.name}"`
                    )
                    data=data.replace('value="email"',
                        `value="${userUpdate.email}"`
                    )
                    data=data.replace('value="phone"',
                        `value="${userUpdate.phone}"`
                    )

                    data=data.replace('<form action="/users/update" method="post">',`<form action="/users/update?id=${index}" method="post">
`)

                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.write(data);
                    res.end()
                })
            }else {
                let data = ''
                req.on('data', chunk => {
                    data += chunk
                })

                req.on('end', () => {
                    let dataForm = qs.parse(data);
                    userUpdate.name = dataForm.name;
                    userUpdate.email = dataForm.email;
                    userUpdate.phone = dataForm.phone;

                    res.writeHead(301, {
                        "Location": "http://localhost:8002"
                    })
                    res.end();
                })
            }
            break;
    }

}))

server.listen(8002, 'localhost', () => {
    console.log('server running in http://localhost:8002')
})