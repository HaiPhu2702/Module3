
    document.getElementById("but").addEventListener('click',()=>{

        let input=document.getElementById("data").value;


        function countdown(input1){

            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    if(input >=0){
                        resolve(input1)
                    }else {
                        reject(new Error("Time out"))
                    }
                },1000)

            })

        }

        async function run(input) {
            for (let i = input; i >=0;i--) {

                await countdown(i).then(result=>{
                    console.log(result)
                })
            }
        }
        run(input)


    })


