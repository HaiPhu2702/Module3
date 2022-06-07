const axios = require("axios");


async function getJSONAPI(){
    let json= await axios.get('http://jsonplaceholder.typicode.com/posts/1')
    return json.config;
}
getJSONAPI().then(result=>{
    console.log(result)
})


let i=10;

function countdown(){
    setTimeout((resolve, reject) => {
        if(i>0){
            i--
            resolve(i)
        }else {
            throw new Error("timeout")
        }
    })
}

function count(){
    countdown()
        .then(result=>console.log(result))
        .catch(err=>{
            console.log(err)
        })

}
count();
