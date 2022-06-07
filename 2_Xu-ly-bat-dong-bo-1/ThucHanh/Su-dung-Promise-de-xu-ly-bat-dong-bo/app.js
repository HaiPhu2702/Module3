function birdthDay(isSick){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(!isSick){
                resolve(2)
            }else {
                reject(new Error('sorrry'))
            }
        },1000)
    })
};

//ốm  truyen true      khỏe==false
birdthDay(false)
    .then((result)=>{
        console.log(`có ${result} bánh`)
    })
    .catch((result)=>{
        console.log(result)
    })
    .finally(()=>{
        console.log('let party')
    })

