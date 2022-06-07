

async function maxNumber(Arr){
        if(Arr instanceof Array){
            let max=Arr[0];
            for (let i = 1; i <Arr.length ; i++) {
                if(Arr[i]>max){
                    max=Arr[i];
                }
            }
            return max;
        }
        throw new Error("not Array");

}

async function f(){
    try{
        let result= await maxNumber([1,2,3,5,9]);
        console.log(result)

    }catch (e) {
        console.log(e.message)

    }
}
f();