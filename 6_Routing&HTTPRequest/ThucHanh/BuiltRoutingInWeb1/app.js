
const http = require('http');
const url = require('url');
const StringDecoder=require('string_decoder').StringDecoder;

http.createServer((req, res) => {

    const handlers={};

    handlers.sample=function (data, callback) {
        callback(406,{'name':'sample data'})
    }

    handlers.notfound=function (data, callback) {callback(404)}

    handlers.home=function (data, callback) {
        callback(200,{'name':"home-page"})
    }

    const router={
        'sample':handlers.sample,
        'home':handlers.home
    }

    const parseUrl=url.parse(req.url,true)
    //getPath
    const  path=parseUrl.pathname;
    const trimPath=path.replace(/^\/+|\/+$/,'')

    // console.log(trimPath);
    // res.end();

    req.on('data',(data) => {

    });

    req.on('end',() =>{
        const chooseHandler = (typeof (router[trimPath])!=="undefined")?router[trimPath]:handlers.notfound;

        const data={
            "trimPath":trimPath
        }

        chooseHandler(data,(statusCode,payload) => {
            statusCode = typeof(statusCode)==='number'?statusCode:200;
            payload=typeof (payload)==='object'?payload: 'kocoTrangNay'
            //doi thanh json
            const payloadString = JSON.stringify(payload)
            res.writeHead(statusCode)
            res.end(payloadString)
        })


    })











})
.listen("3000",()=>{
    console.log("running")
})


