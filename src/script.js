function currentTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  return `${day} | ${date}  ${month} | ${hours}:${minutes}`;
}
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#visibility").innerHTML =
    response.data.visibility / 1000;
  document.querySelector("#date").innerHTML = currentTime(
    response.data.dt * 1000
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = `13685caebdbff39ce18670d2df50386a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input-text");
  let h1 = document.querySelector("#city");
  h1.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchLocation(position) {
  let units = "metric";
  let apiKey = `13685caebdbff39ce18670d2df50386a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;

  degreesElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let degreesElement = document.querySelector("#temperature");
  degreesElement.innerHTML = Math.round(celciusTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wedn", "Thur", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="card-group cardStyle row no-gutters" id="forecast" >`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="">
       <div class="col">
      <div class="card border-primary">
            <div class="card-body cardStyle">
              <h5 class="card-title day">${day}</h5>

              <p class="card-text weatherImage">
                <i class="fa-solid fa-sun weatherIcon"></i>
              </p>
              <p class="card-text degreesCard">18°| 28°</p>
            </div>
               </div>
          </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;
let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = currentTime(now);

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
displayForecast();
