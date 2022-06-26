const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

// maps file extention to MIME types
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',
};


http.createServer((req, res) =>{
    console.log(`${req.method}  ${req.url}`)
    //parser URl
    const parseUrl=url.parse(req.url)


    // extract URL path
    // by limiting the path to current directory only
    const sanitizePath = path.normalize(parseUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname=path.join(__dirname, sanitizePath);


    fs.exists(pathname,function (exist){
        if(!exist){
            res.statusCode=404;
            res.end(`File ${pathname} does not exist`)
        return;
        }

        // is directory
        if(fs.statSync(pathname).isDirectory()){
            pathname+='list.html';
        }

        //read file
        fs.readFile(pathname,(err, data)=>{
            if(err){
                console.log(err)
            }else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext=path.parse(pathname).ext;
                //if the file is found ,ser Content-type and send data
                res.setHeader('Content-Type',mimeType[ext]||'text/plain');
                res.end(data);
            }
        })
    })
}).listen(parseInt(port))
console.log(`Server listening on port ${port}`);
