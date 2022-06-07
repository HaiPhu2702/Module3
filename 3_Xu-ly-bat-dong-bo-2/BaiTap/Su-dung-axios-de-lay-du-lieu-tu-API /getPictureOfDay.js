const axios = require("axios");


function getPitureOfDay() {
    return new Promise((resolve)=>{

            axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(json=>{
                return resolve(json.data)
            })

    })
}
getPitureOfDay()
.then(result=>{
    console.log(result)
})