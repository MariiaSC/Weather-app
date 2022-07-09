function currentTime(now) {
  let date = now.getDate();
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

  return `${day} | ${date} ${month} | ${hours}:${minutes}`;
}
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("tempearture").innerHTML = Math.round(
    response.data.main.temp
  );
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let units = "metric";
  let apiKey = "13685caebdbff39ce18670d2df50386a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#temperature");
  degreesElement.innerHTML = 77;
}
function convertToCelcius(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#temperature");
  degreesElement.innerHTML = 25;
}

//Feature 1
let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = currentTime(now);

//Feature 2
let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", search);

//Feature 3

let fahrehheitLink = document.querySelector("#fahrenheit-link");
fahrehheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
