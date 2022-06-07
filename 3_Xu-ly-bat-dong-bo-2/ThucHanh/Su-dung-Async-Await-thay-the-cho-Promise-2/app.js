

async function myBirthDay(isSick){
    if(!isSick){
        return 2;
    }
    throw new Error("I'm sorry")
}
async function doAsync(){
 try{
     let result=await  myBirthDay(false)
    console.log(result);
}catch (e) {
     console.log(e)
 }
 finally {
     console.log("party")
 }

}
doAsync();