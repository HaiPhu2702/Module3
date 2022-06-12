
const mysql=require("mysql");
const http=require("http");

let connection=mysql.createConnection({
    location:"localhost",
    user:"root",
    password:"Matkhau123@",
    database:"test_connection",
    charset:"utf-utf8_general_ci"
}).connect(err => {
    if (err) {
        console.log(err)
    }
    console.log("connection success")
})

http.createServer(async(req, res) => {

    if(req.method==="POST"||req.url==='/url'){
        let bufer=[];
        for await (const chunk of req){
            bufer.push(chunk);
        }
        const data=Buffer.concat(bufer).toString();
        const userData=JSON.parse(data);
        const sql=`insert into customer(name, address) values('${userData.name}','${userData.address}')`
    }





}).listen(8000,()=>{
    console.log("server listening")
})