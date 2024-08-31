
import { format } from "date-fns";
const icons = require.context("./icons", false, /\.svg$/);

const search = document.querySelector(".search-box-input");
const search_icon = document.querySelector(".fa-magnifying-glass");
const key = "NK38F3VD6TQN5CDBV7U6UTX8H";
let location = "Athens";
let unit = "metric";

export async function loadJson() {
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${key}`
    );
    let data = await response.json();

    populateInfo(data);
    populateDetails(data);
    populateForecast(data.days);

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export  function initApp() {
  loadJson();
  search_icon.addEventListener("click", () => {
    location = search.value;
    search.value = "";
    loadJson();
  });

  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      location = search.value;
      search.value = "";
      loadJson();
    }
  });

  const unitToggle = document.querySelector(".unit-toggle");
  unitToggle.addEventListener("click", () => {
    // Toggle the unit between "metric" (Celsius) and "us" (Fahrenheit)
    unit = unit === "metric" ? "us" : "metric";
    // Update the button text to reflect the change
    unitToggle.innerText = unit === "metric" ? "Switch to °F" : "Switch to °C";
    // Reload the weather data with the new unit
    loadJson();
  });

}

function populateInfo(data) {
  const iconName = data.currentConditions.icon;
  const iconPath = icons(`./${iconName}.svg`);
  const dataTime = data.currentConditions.datetime;

  const description = document.querySelector(".weather-description");
  const city = document.querySelector(".weather-city_name");
  const date = document.querySelector(".weather-date");
  const time = document.querySelector(".weather-time");
  const temperature = document.querySelector(".weather-temperature");
  const weather_icon = document.querySelector(".weather-icon");

  description.innerHTML = data.currentConditions.conditions;
  city.innerHTML = data.resolvedAddress;
  date.innerHTML = format(data.days[0].datetime, "EEEE, dd MMM");
  time.innerHTML = formatTime(dataTime);
  temperature.innerHTML = `${data.currentConditions.temp} °${unit === "metric" ? "C" : "F"}`;

  weather_icon.src = iconPath;
}

function populateDetails(data) {
  const feels = document.getElementById("feels");
  const humidity = document.getElementById("humidity");
  const rain = document.getElementById("rain");
  const wind = document.getElementById("wind");

  feels.innerHTML = `${data.currentConditions.feelslike} °${unit === "metric" ? "C" : "F"}`;
  humidity.innerHTML = `${data.currentConditions.humidity} %`;
  rain.innerHTML = `${data.days[0].precipprob} %`;
  wind.innerHTML = `${data.currentConditions.windspeed} ${unit === "metric" ? "km/h" : "mph"}`;
}

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

  // Format the time to 23:25pm
  return format(date, "HH:mm a");
}

function populateForecast(days) {
  const divs = document.querySelectorAll(".forecast-daily");

  divs.forEach((item, index) => {
    const day = item.querySelector(".daily-day");
    day.innerHTML = format(days[index + 1].datetime, "EEEE");

    const temp_high = item.querySelector(".temperature-high");
    temp_high.innerHTML = `${days[index + 1].tempmax} °${unit === "metric" ? "C" : "F"}`;

    const temp_low = item.querySelector(".temperature-low");
    temp_low.innerHTML = `${days[index + 1].tempmin} °${unit === "metric" ? "C" : "F"}`;

    const icon = item.querySelector(".daily-icon");
    const iconName = days[index + 1].icon;
    icon.src = icons(`./${iconName}.svg`);
  });
}
