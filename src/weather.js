/* eslint-disable */

import { format } from "date-fns";
const icons = require.context('./icons', false, /\.svg$/);



const search = document.querySelector(".search-box-input");
const search_icon = document.querySelector(".fa-magnifying-glass");
const key = "NK38F3VD6TQN5CDBV7U6UTX8H";
let location = "London";

export async function loadJson() {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`
  );
  let data = await response.json();

  



  populateInfo(data);
  populateDetails(data);
  console.log(data);

  
  return data;
  
}

export function initApp() {
  search_icon.addEventListener('click',()=>{
      location = search.value;
      loadJson();
 


  })

  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      location = search.value;
      search.value = ""
      loadJson();
    
    }
  });
}

function populateInfo(data){
    const iconName = data.currentConditions.icon;
    const iconPath = icons(`./${iconName}.svg`)
    const farenheit = data.currentConditions.temp;
    const celsius = Math.round((farenheit-32)*5/9);

    const description = document.querySelector('.weather-description');
    const city = document.querySelector('.weather-city_name');
    const date = document.querySelector('.weather-date');
    const time = document.querySelector('.weather-time');
    const temperature = document.querySelector('.weather-temperature');
    const weather_icon = document.querySelector('.weather-icon')

    description.innerHTML = data.currentConditions.conditions;
    city.innerHTML = data.resolvedAddress;
    date.innerHTML = format(data.days[0].datetime,"EEEE, dd MMM");
    time.innerHTML = data.currentConditions.datetime;
    temperature.innerHTML = data.currentConditions.temp;
    
    weather_icon.src = iconPath;
}

function populateDetails(data){
    const feels = document.getElementById('feels')
    const humidity = document.getElementById('humidity')
    const rain = document.getElementById('rain')
    const wind = document.getElementById('wind')

    feels.innerHTML = data.currentConditions.feelslike;
    humidity.innerHTML = `${data.currentConditions.humidity} %`;
    rain.innerHTML = `${data.currentConditions.precipprob} %`;
    wind.innerHTML = `${data.currentConditions.windspeed} km/h`;
}
