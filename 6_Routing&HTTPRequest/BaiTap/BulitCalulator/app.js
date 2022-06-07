
const http = require('http');
const url = require('url');
const fs=require('fs');

http.createServer((req, res) => {
    const parseUrl=url.parse(req.url,true)
    const path = parseUrl.pathname;
    const trimPath=path.replace(/^\/+|\/+$/g,'')

    const method=req.method.toLowerCase();

        const chooseHandler=(typeof(router[trimPath])!=="undefined")?router[trimPath]:handlers.notfound;
        chooseHandler(req,res);


})
.listen('3000',()=>{
    console.log('running server')
})

const handlers={};

handlers.calulator=function(req, res){
    fs.readFile('./views/calulator.html', function(err, data){
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            return res.end();
        }
    )

}

handlers.result=function(req, res){
    fs.readFile('./views/result.html', function(err, data){
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            return res.end();
        }
    )
}
handlers.notfound=function (req, res){
   fs.readFile('./views/notfound.html', function(err, data){
       res.writeHead(200,{"Content-Type":"text/html"})
       res.write(data)
       return res.end();
       }
    )
}

const router={
    'calulator':handlers.calulator,
    'result':handlers.result
}