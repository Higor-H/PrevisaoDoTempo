var now = new Date();
var hour = now.getHours();
let timeNow;
var icon = document.querySelector("#imgIcon");


const frmCitySearch = document.querySelector("#frmCitySearch");
const showWeatherInfo = document.querySelector("#showWeatherInfo");
const showLocal = document.querySelector("#showLocal");
const showTemperature = document.querySelector("#showTemperature");
const showTemperatureFeels = document.querySelector("#showTemperatureFeels");
const showTemperatureDetails = document.querySelector("#showTemperatureDetails");
const showHumidity = document.querySelector("#showHumidity");
const showWind = document.querySelector("#showWind");

// Variaveis da API
const key = "9caf5deb117e62e1d040ac0889adf958";
const lang = "pt_br";

function getWeather(city, country){
    return fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=${lang}&appid=${key}`)
    .then((weatherData) => weatherData.json())
    .catch((msgError) => console.log(msgError));
}

async function showWeather(city, country){
    try{
        const weatherData = await getWeather(city,country);
        if (weatherData.cod != "404"){
            showWeatherInfo.textContent = `${weatherData.weather[0].description}`;
            showLocal.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
            showTemperature.textContent = `${weatherData.main.temp} C°`;
            showTemperatureFeels.textContent = `${weatherData.main.feels_like} C°`;
            showTemperatureDetails.textContent = `Maxima: ${weatherData.main.temp_max} C°, Mínima: ${weatherData.main.temp_min} C°`;
            showHumidity.textContent = `Umidade: ${weatherData.main.humidity}%`;
            showWind.textContent = `Velocidade do vento: ${weatherData.wind.speed} m/s`;
            setBackground(timeNow, weatherData.weather[0].main )
        } else{
            showTemperature.textContent = `Cidade não encontrada`;
            errorData();
            alert("Cidade não encontrada 😭");
        }

    } catch (msgError){
            showTemperature.textContent = `API fora do ar`;
            errorData();
            alert("API fora do ar, tente mais tarde 😭");
    }
}
     
function errorData(){
    showWeatherInfo.textContent = `-`;
    showLocal.textContent = `-`;
    showTemperatureFeels.textContent = `- C°`;
    showTemperatureDetails.textContent = `Maxima: - C°, Mínima: - C°`;
    showHumidity.textContent = `Umidade: -%`;
    showWind.textContent = `Velocidade do vento: - m/s`;
}


frmCitySearch.addEventListener("submit", function(event){
    event.preventDefault();
    
    const cityValue = frmCitySearch.citySearch.value;
    const countryValue = frmCitySearch.countrySearch.value;
    showWeather(cityValue, countryValue);           
});

var weatherImages = {
    "morning": {
        "Rain": "/img/morning/morning_rain.gif",
        "Clouds": "/img/morning/morning_clouds.gif",
        "Drizzle": "/img/morning/morning_clouds.gif",
        "Thunderstorm": "/img/morning/morning_thunderstorm.gif",
        "Snow": "/img/morning/morning_snow.gif",
        "Clear": "/img/morning/morning_clear.png"
    },
    "day": {
        "Rain": "/img/day/day_rain.gif",
        "Clouds": "/img/day/day_clouds.gif",
        "Drizzle": "/img/day/day_clouds.gif",
        "Thunderstorm": "/img/day/day_thunderstorm.gif",
        "Snow": "/img/day/day_snow.gif",
        "Clear": "/img/day/day_clear.png"
    },
    "afternoon": {
        "Rain": "/img/afternoon/afternoon_rain.gif",
        "Clouds": "/img/afternoon/afternoon_clouds.gif",
        "Drizzle": "/img/afternoon/afternoon_clouds.gif",
        "Thunderstorm": "/img/afternoon/afternoon_thunderstorm.gif",
        "Snow": "/img/afternoon/afternoon_snow.gif",
        "Clear": "/img/afternoon/afternoon_clear.png"
    },
    "night": {
        "Rain": "/img/night/night_rain.gif",
        "Clouds": "/img/night/night_clouds.gif",
        "Drizzle": "/img/night/night_clouds.gif",
        "Thunderstorm": "/img/night/night_thunderstorm.gif",
        "Snow": "/img/night/night_snow.gif",
        "Clear": "/img/night/night_clear.png"
    }
};


var weatherIcons = {
    "Rain": './img/icon/rain.png',
    "Clouds": './img/icon/clouds.png',
    "Drizzle": './img/icon/clouds.png',
    "Thunderstorm": './img/icon/thunderstorm.png',
    "Snow": './img/icon/snow.png',
    "Clear": './img/icon/clear_day.png'
};

function setBackground(timeNow, mainWeather){
    if(weatherImages[timeNow] && weatherImages[timeNow][mainWeather]){
        document.body.style.backgroundImage = "url('" + weatherImages[timeNow][mainWeather] + "')";
    }
    if(weatherIcons[mainWeather]){
        icon.src = weatherIcons[mainWeather];
    }
}

if (hour >= 5 && hour < 8) {
// 5-8 horas
timeNow = "morning";
document.body.style.backgroundImage = "url(/img/morning/morning_clear.png')";
} else if (hour >= 8 && hour < 16) {
// 8-16 horas
timeNow = "day";
document.body.style.backgroundImage = "url('/img/day/day_clear.png')";
} else if (hour >= 16 && hour < 19) {
// 16-19 horas
timeNow = "afternoon";
document.body.style.backgroundImage = "url('/img/afternoon/afternoon_clear.png')";
} else {
// 20-4 horas
timeNow = "night";
document.body.style.backgroundImage = "url('/img/night/night_clear.png')";
}