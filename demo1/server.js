const {createServer}=require('http')
const serverSocket = require('socket.io').Server;



const fs = require("fs");

const port=8080
const httpServer =createServer((req,res) => {
    fs.readFile('./templates/list.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})
const io=new serverSocket(httpServer)

io.on('connection',socket => {
    console.log( 'connected')
    socket.emit('send','wellcome to the page because you have connected success','love you')

    socket.on('user-login',data=>{
        console.log(data)
    })
})

httpServer.listen(port,()=>{
    console.log(`server listening http://localhost:${port}`)
})
