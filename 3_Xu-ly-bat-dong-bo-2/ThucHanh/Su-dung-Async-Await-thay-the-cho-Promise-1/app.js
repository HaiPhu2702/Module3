    //
    //
    //
    // async function divide(a,b){
    // if (b!==0){
    //     return a/b;
    // }
    // throw new Error("Math error")
    // }
    //
    // async function f(){
    //     try{
    //         let result=divide(1,3);
    //         console.log(result)
    // }catch (e) {
    //         console.log(e)
    //     }
    //
    // }
    // f()



    //promise
    const promise=(a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(b!==0){
                 resolve(a/b);
            }else {
                reject(new Error('dont divide with 0'))
            }
        },1000)
    })
    }

    promise(1,0)
        .then((result)=>{
            console.log(result)
        })
        .catch((e)=>{
            console.log(e)
        })














