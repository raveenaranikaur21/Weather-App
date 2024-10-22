const apiKey = "5f66df3b101cf4daecddd926ebf56823";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const url = apiUrl + city + `&appid=${apiKey}`;
        console.log('Requesting:', url);  // Log the full request URL
        const response = await fetch(url);
        console.log('Response:', response);  // Log the response object
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log('Weather Data:', data);  // Log the weather data

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set the weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png"; // Default icon
        }
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
