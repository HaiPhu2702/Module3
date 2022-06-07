
// function demo(day){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             if(day<=5){
//                 resolve("toi khoe")
//             }
//             reject("toi om")
//
//         },1000)
//     })
//
//
// }
//
//
// async function f(day){
//   return  await demo(day)
// }
// f(7).then(result=>{
//     console.log(result)
// }).catch(e=>{
//     console.log(e)
// })

let i=10;

// function count(i){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//            if(i>0){
//                resolve(i)
//             }else {
//                reject(new Error("error"))
//            }
//         },1000)
//
//     })
// }
//
// async function loop(){
//     for (let j = i; j >=0 ; j--) {
//         await count(j).then((result)=>{
//             console.log(result)
//         })
//     }
// }
// loop();


