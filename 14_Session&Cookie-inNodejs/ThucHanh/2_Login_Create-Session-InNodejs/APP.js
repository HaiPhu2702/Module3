const http = require('http');
const url = require('url');
const fs = require("fs");
const qs = require("qs");



http.createServer(function(req, res){

    const urlPath=url.parse(req.url,true)
    const pathname=urlPath.pathname;
    const trimPath=pathname.replace(/^\/+|\/$/g,'')

    const chooseHandler=((typeof router[trimPath]) !=='undefined')? router[trimPath]:handlers.notfound
    chooseHandler(req,res)

}).listen(8080,()=>{
    console.log("server listening http://localhost:8080")
})




const handlers={};

handlers.login=function (req, res) {
    fs.readFile('./views/login.html',(err, data)=>{
        if(err) throw err;

        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(data)
        return res.end();
    })
}

handlers.notfound=function (req, res) {
    fs.readFile('./views/notfound.html',(err, data)=>{
        if(err) throw err;

        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(data)
        return res.end();
    })
}

handlers.home=async function (req, res) {
    if(req.method==="POST"){
         let buffer=[];
         for await (const chunk of req) {
             buffer.push(chunk)
         }
         const dataForm=Buffer.concat(buffer).toString();
         const parseDataFrom=qs.parse(dataForm);

         const expires=Date.now()+1000*60*60;

         const tokenSession=`{
         name:'${parseDataFrom.name}',
         email:'${parseDataFrom.email}',
         password:'${parseDataFrom.password}',
         expires:'${expires}',
         }`;

        createTokenSession(tokenSession);
        fs.readFile('./views/homepage.html', 'utf8', function (err, datahtml) {
            if (err) {
                console.log(err);
            }
            datahtml = datahtml.replace('{name}', parseDataFrom.name);
            datahtml = datahtml.replace('{email}', parseDataFrom.email);
            datahtml = datahtml.replace('{password}', parseDataFrom.password);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(datahtml);
            return res.end();
        });



    }

}


const router={
    'login':handlers.login,
    'home':handlers.home,
    'notfound':handlers.notfound
}

const createTokenSession = function (data){
    //tao ngau nhien ten file
    let tokenId = createRandomString(20);
    fs.writeFile(`./token/${tokenId}`, data, err => {
        if (err)throw err;
    });
}

const createRandomString = function (strLength){
    strLength = typeof(strLength) == 'number' && strLength >0 ? strLength:false;
    if (strLength){
        const possibleCharacter = 'abcdefghiklmnopqwerszx1234567890';
        let str='';
        for (let i = 0; i <strLength ; i++) {
            let randomCharter = possibleCharacter.charAt(Math.floor(Math.random()*possibleCharacter.length));
            str+=randomCharter;
        }
        return str;
    }
}
