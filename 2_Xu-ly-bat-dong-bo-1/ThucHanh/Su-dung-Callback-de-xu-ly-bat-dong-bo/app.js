

function downLoad(url,callback){
    setTimeout(()=>{
        console.log(`downloading ${url}`);
        callback(url);
    })
}
let url = 'https://wwww.javascripttutorial.net/pic.jpg';

downLoad(url,process);

function process(picture){
    console.log(`processing ${picture}`)
}
