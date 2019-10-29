const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value p");
const desc = document.querySelector(".temperature-description p");
const loca = document.querySelector(".location p");
const notification = document.querySelector(".notification");

const KELVIN = 273; // độ kelvin
const key = "82005d27a116c2880c8f0fcb866998a0"; // key api
const weather = {} // data
weather.temperature = {
    unit: "c"
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);// setPositon, showError là hàm callback
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
// 
function setPosition(position) {
    let latitude = position.coords.latitude; // vĩ độ
    let longitude = position.coords.longitude; // kinh độ

    getWeather(latitude, longitude);
}
// 
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);

    fetch(api).then(function (res) {
        return res.json();
    }).then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function () {
        displayWeather();
    })
}
function displayWeather() {
    icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    desc.innerHTML = weather.description;
    loca.innerHTML = `${weather.city}, ${weather.country}`;
}
// độ C sang F
function CToF(temp) {
    return (temp * 9 / 5) + 32;
}

temp.addEventListener('click', function () {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === 'c') {
        let F = CToF(weather.temperature.value);
        F = Math.floor(F);

        temp.innerHTML = `${F}°<span>F</span>`;
        weather.temperature.unit = "f";
    } else {
        temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "c"
    }
})
