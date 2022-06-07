

const http = require('http');
const fs = require('fs');

http.createServer((req, res)=>{
    let html='';
    fs.readFile("./data/data.txt","utf8",(err, data)=> {
        data=JSON.parse(data)

        data.forEach((value,index)=>{
            html+='<tr>'
            html+=`<td>${value.id}</td>`
            html+=`<td>${value.name}</td>`
            html+=`<td>${value.price}</td>`
            html+=`<td><button type="button" class="btn btn-danger">Delete</button></td>`
            html+=`<td><button type="button" class="btn btn-primary">Update</button></td>`
            html+='</tr>'
                     })
            })

    fs.readFile('./views/index.html',"utf8",function(err, data){
        res.writeHead(200, {"Content-Type": "text/html"})
        data = data.replace('{content}', html)
        res.write(data);
        res.end();
    })

               })

.listen("8080",()=>{
    console.log("server listening")
})