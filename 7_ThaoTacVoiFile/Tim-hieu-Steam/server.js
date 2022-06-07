const http = require('http')

const fs = require('fs');


const server = http.createServer((req, res) => {
        // fs.readFile('./big1.file', 'utf-8', (err, data)=>{
        //     console.log(data)
        // })

        const stream = fs.createReadStream(__dirname + '/big.file')
        stream.pipe(res);
})
server.listen(3000);

// const fs = require("fs");
// let data = '';
//
// // Create a readable stream
// const readerStream = fs.createReadStream("big1.file");
// // Create a writable stream
// const writerStream = fs.createWriteStream('output.txt');
//
// // Set the encoding to be utf8.
// readerStream.setEncoding("UTF8");
//
// // Handling data stream event
// readerStream.on("data", function(chunk) {
//     data += chunk;
//     console.log(data);
// });
//
// // Handling end stream event
// readerStream.on("end",function() {
//
//     // console.log(data);
// });
//
// // Handling error stream event
// readerStream.on("error", function(err) {
//     console.log(err.stack);
// });
//
// // Write the data to stream with
// // encoding to be utf8
//
//
// // Mark the end of file
// writerStream.end();
//
// // Handling finish stream event
// writerStream.on('finish', function () {
// });


// fs.createReadStream("big1.file").pipe(fs.createWriteStream('./out.txt'))

