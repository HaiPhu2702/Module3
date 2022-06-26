const  http= require('http');
const  url= require('url');
const fs = require("fs");
const qs = require("qs");

http.createServer((req, res) => {
    const parseUrl=url.parse(req.url,true)
    const path=parseUrl.pathname;
    const trimPath=path.replace(/^\/+|\/+$/g,'');

    const method=req.method.toLowerCase();

    if (method==="get"){
        const chooseHandler=(typeof(router[trimPath])!=="undefined")?router[trimPath]:handlers.notfound;
        chooseHandler(req, res);
    }else {
      const chooseHandler=router.profile;
        chooseHandler(req,res);
    }
})
.listen('3000', function(){
    console.log("running server")
})

const handlers = {};
handlers.home=function(req, res){
    fs.readFile('./views/home.html', function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(data)
        return  res.end();
    })
}

handlers.login=function(req, res){
    fs.readFile('./views/login.html', function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(data)
        return  res.end();
    })
}

handlers.notfound=function(req, res){
    fs.readFile('./views/notfound.html', function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(data)
        return  res.end();
    })
}



handlers.profile=function(req, res){

    let data='';

    req.on('data', chunk =>{
        data+=chunk;
    })

    req.on('end', (data)=>{
       data=qs.parse(data);

        const name=data.name;

        const stringObject=`<h1>Hello ${name}</h1>`;
        console.log(name);

        fs.writeFile('.views/profile.html', stringObject,err => {
            if(err) return console.error(err);

            console.log("ghi dữ liệu thành công")
            console.log("đọc dữ liệu vừa ghi")

            fs.readFile('.views/profile.html', (err, data)=>{
                res.writeHead(200,{"Content-Type": 'text/html'})
                res.write(data)
                return res.end();
            })

        })

    })

}


const router={
    "home":handlers.home,
    "profile":handlers.profile,
    "login":handlers.login,
}
