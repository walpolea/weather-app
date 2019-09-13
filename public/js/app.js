console.log("client init");

document.querySelector(".weather-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.querySelector(".weather-input").value;
  if (location !== "") {
    clearWeather();
    document.querySelector(".weather-location").innerHTML = "Loading...";
    getWeather(location);
  }

  document.querySelector(".weather-input").value = "";
})

async function getWeather(location) {
  const weatherResponse = await fetch(`/weather?address=${location}`);
  const weatherData = await weatherResponse.json();

  if (weatherData.error) {

    document.querySelector(".weather-location").innerHTML = weatherData.error;

  } else {

    document.querySelector(".weather-location").innerHTML = weatherData.location;
    document.querySelector(".weather-forecast").innerHTML = weatherData.forecast;

  }

}

function clearWeather() {

  document.querySelector(".weather-location").innerHTML = "";
  document.querySelector(".weather-forecast").innerHTML = "";

}