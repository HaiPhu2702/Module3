
const URL_API = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '02e3323f29bc461c2346db2fe3989729'

function getWeather(name){
    return new Promise((resolve, reject) => {
        axios.get(`${URL_API }`, {
            params:{
                q:name,
                appid: API_KEY
            }
        })
            .then(response=>{
               resolve(response)
            })
            .catch(err=>{
                reject(err)
            })


    })
}

document.getElementById('search').addEventListener('click', search1)
function search1(){
    let nameCity = document.getElementById('search-name').value;
    showData(nameCity);
}

function showData(nameCity){
    getWeather(nameCity)
        .then((res)=>{
        let temp = res.data.main.temp;
        let oC=Math.floor(temp-273);
        let cityCurrWeather = res.data.name;
        let weatherCloudy=res.data.weather[0].main

        let date=new Date();

        let currDay=date.toDateString();
        document.getElementById('temp-oC').innerHTML=oC;
        document.getElementById('weather-date').innerHTML=currDay;
        document.getElementById('weather-city').innerHTML=cityCurrWeather;
        document.getElementById('weather-cloudy').innerHTML=weatherCloudy;
    })
        .catch(err=>{
            alert(err.message);
        })
}
showData('Hanoi')

