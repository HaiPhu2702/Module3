
const http= require('http');
const fs= require('fs');

let server=http.createServer((req, res) => {
    fs.readFile('list.html', 'utf8',(err, data) => {

        if(err) {
            console.log(err)
        }else {

            //replace noi dung
            let username ="Admin"
            data=data.replace('{username}', username)


            res.writeHead(200,{"Content-Type": 'text/html'});
            res.write(data);
            return res.end();
        }

    })
})

server.listen('8080',()=>{
    console.log("running")
})