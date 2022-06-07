
function buyCar(isEnoughMoney){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(isEnoughMoney){
                resolve('buy Car')
            }else {
                reject(new Error('Poor'))
            }
        },1000)
    })
}

buyCar(true)
.then((result)=>{
    console.log(result)
})
.catch((result)=>{
    console.log(result)
})