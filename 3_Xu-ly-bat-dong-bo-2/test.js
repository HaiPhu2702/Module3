// class Thenable {
//     constructor(num) {
//         this.num = num;
//     }
//
//     then(resolve,reject){
//         setTimeout(()=>{
//             resolve(this.num*2)
//         },1000)
//     }
//
// }
//
// async function f(){
//     let result=await new Thenable(1)
//     console.log((result))
// }
// f();

// class Waiter{
//     async wait(){
//         return Promise.resolve(1)
//     }
// }
//
// new Waiter()
// .wait()
// .then(result=>console.log(result))
//
// function getQuote() {
//     let quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit laborum.";
//     return quote;
// }
//
// async function main() {
//     try {
//         var quote = await getQuote();
//         console.log(quote);
//     } catch (error) {
//         console.error(error);
//     }
// }
//
// main();
//
//
// const fs=require('fs');
//
// function readFile(){
//     fs.readFile('text.txt',function (err,data){
//         if(err){
//             throw new Error("error")
//         }
//     })
// }
//
// async function demo(){
//     try{
//
//     }catch (e) {
//         console.log(e)
//     }
// }




// const opition={
//     transformRequest:[
//         (data,header)=>{
//             //do something with data
//             // return data;
//         }
//     ]
// }



//Interceptors(đánh chặn request,response trc khi vào then or catch)
axios.intercept.request.use (config=>{
    return config
},(error)=>{
    return Promise.reject(error)
})
















































