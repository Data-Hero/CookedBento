// ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
// │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
// └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
// Functions to setup Weather widget.

const iconElement = document.querySelector('.weatherIcon');
const tempElement = document.querySelector('.weatherValue p');
const descElement = document.querySelector('.weatherDescription p');

const weather = {};
weather.temperature = {
	unit: 'celsius',
};

var tempUnit = CONFIG.weatherUnit;

const KELVIN = 273.15;
const key = `${CONFIG.weatherKey}`;

setPosition(); setInterval(function() {
 	setPosition();
 }, 3600000) 

setInterval(function() {
	displayWeather(sessionStorage.getItem("darkTheme") === "enabled");		
}, 500)

window.onstorage = () => {
	// When local storage changes, dump the list to
	// the console.
	console.log(JSON.parse(window.sessionStorage.getItem('sampleList')));
};

function setPosition() {
	getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
}

function getWeather(latitude, longitude) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${CONFIG.language}&appid=${key}`;
	fetch(api)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {
			let celsius = Math.floor(data.main.temp - KELVIN);
			weather.temperature.value = tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32;
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;

		})
		.then(function() {
			displayWeather(false);
		});
}

function displayWeather(darkTheme = false) {
	if (!weather.iconId) {
		weather.iconId = 'unknown';
	} 
	iconElement.innerHTML = darkTheme
		? `<img src="assets/icons/${CONFIG.darkWeatherIcons}/${weather.iconId}.svg"/>`
		:`<img src="assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.svg"/>`;
	if (weather.temperature.value === undefined) {
		return;
	}
	tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`;
	descElement.innerHTML = weather.description;
}

