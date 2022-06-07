const axios = require("axios");

async function getAllUser() {
    return await axios.get('https://jsonplaceholder.typicode.com/users').then(json=>{
        return json.data
    })

}
getAllUser().then(result=>{
    console.log(result);
})
