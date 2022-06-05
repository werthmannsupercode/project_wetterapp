"use strict";
const key = "05e51114b5e93010f054078695bca843";
const locationname = document.querySelector("#location");
const temp = document.querySelector("#temp");
const description = document.querySelector("#description");
const feels_like = document.querySelector("#feels_like");
const temp_min = document.querySelector("#temp_min");
const temp_max = document.querySelector("#temp_max");

// VORHERSAGE
const gradPlus3h = document.querySelector("#gradPlus3h");
const zeitPlus3h = document.querySelector("#zeitPlus3h");
const gradPlus6h = document.querySelector("#gradPlus6h");
const zeitPlus6h = document.querySelector("#zeitPlus6h");
const gradPlus9h = document.querySelector("#gradPlus9h");
const zeitPlus9h = document.querySelector("#zeitPlus9h");
const gradPlus12h = document.querySelector("#gradPlus12h");
const zeitPlus12h = document.querySelector("#zeitPlus12h");

// 5 TAGE VORHERSAGE (short
const datumPlus1Day = document.querySelector("#datumPlus1Day");
const tempPlus1Day = document.querySelector("#tempPlus1Day");

const datumPlus2Day = document.querySelector("#datumPlus2Day");
const tempPlus2Day = document.querySelector("#tempPlus2Day");

const datumPlus3Day = document.querySelector("#datumPlus3Day");
const tempPlus3Day = document.querySelector("#tempPlus3Day");

const datumPlus4Day = document.querySelector("#datumPlus4Day");
const tempPlus4Day = document.querySelector("#tempPlus4Day");

const datumPlus5Day = document.querySelector("#datumPlus5Day");
const tempPlus5Day = document.querySelector("#tempPlus5Day");

// async function

let getWeather = () => {
  let location = document.querySelector("#inputPlace").value;
  let lat;
  let lon;
  let arr = [];
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric&lang=DE`
  )
    .then((response) => response.json())
    .then((json) => {
      locationname.innerHTML = json.name;
      description.innerHTML = json.weather[0].description;
      temp.innerHTML = `${json.main.temp.toFixed(0)}°C`;
      feels_like.innerHTML = `Gefühlt wie ${json.main.feels_like.toFixed(0)}°C`;
      temp_min.innerHTML = `Minimale Temperatur ${json.main.temp_min.toFixed(
        0
      )}°C`;
      temp_max.innerHTML = `Maximale Temperatur ${json.main.temp_max.toFixed(
        0
      )}°C`;
      // Enter ZIP Code to get Weather Data
      fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${location},DE&limit=1&appid=${key}&units=metric&lang=DE`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.cod == "404") {
            let locationame;
            location = locationame;
          }
          console.log(json); // by PLZ
          // locationname.innerHTML = json.name;
          // locationname;
          console.log(json.lat);
          console.log(json.lon);
          lat = json.lat;
          lon = json.lon;
        });
      // LocationName to coordinates
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location},DE&limit=1&appid=${key}&units=metric&lang=DE`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.length != 0) {
            lat = json[0].lat;
            lon = json[0].lon;
          }
          // Weatherforecast (5days every 3hrs)
          setTimeout(() => {
            fetch(
              `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=DE`
            )
              .then((response) => response.json())
              .then((json) => {
                json.list.forEach((element) => {
                  console.log(element.dt_txt);
                  console.log(element.main.temp.toFixed(0) + "°C");
                  console.log(element.weather[0].description);
                });
                gradPlus3h.innerHTML = `${json.list[0].main.temp.toFixed(0)}°C`;
                zeitPlus3h.innerHTML = `${json.list[0].dt_txt.slice(11, 16)}`;
                gradPlus6h.innerHTML = `${json.list[1].main.temp.toFixed(0)}°C`;
                zeitPlus6h.innerHTML = `${json.list[1].dt_txt.slice(11, 16)}`;
                gradPlus9h.innerHTML = `${json.list[2].main.temp.toFixed(0)}°C`;
                zeitPlus9h.innerHTML = `${json.list[2].dt_txt.slice(11, 16)}`;
                gradPlus12h.innerHTML = `${json.list[3].main.temp.toFixed(
                  0
                )}°C`;
                zeitPlus12h.innerHTML = `${json.list[3].dt_txt.slice(11, 16)}`;
                console.log(json.list);
                tempPlus1Day.innerHTML = `${json.list[7].main.temp.toFixed(
                  0
                )}°C`;
                datumPlus1Day.innerHTML = json.list[7].dt_txt.slice(5, 10);
                tempPlus2Day.innerHTML = `${json.list[15].main.temp.toFixed(
                  0
                )}°C`;
                datumPlus2Day.innerHTML = json.list[15].dt_txt.slice(5, 10);
                tempPlus3Day.innerHTML = `${json.list[23].main.temp.toFixed(
                  0
                )}°C`;
                datumPlus3Day.innerHTML = json.list[23].dt_txt.slice(5, 10);
                tempPlus4Day.innerHTML = `${json.list[31].main.temp.toFixed(
                  0
                )}°C`;
                datumPlus4Day.innerHTML = json.list[31].dt_txt.slice(5, 10);
                tempPlus5Day.innerHTML = `${json.list[39].main.temp.toFixed(
                  0
                )}°C`;
                datumPlus5Day.innerHTML = json.list[39].dt_txt.slice(5, 10);
              });
          }, 800);
        });
    });
};

/*
      fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${location},DE&limit=1&appid=05e51114b5e93010f054078695bca843&units=metric&lang=DE`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(`PLZ :${location}`);
          console.log(json); // by PLZ
        });
      console.log("TEST");

      8, 16 ,  24 , 32 , 40
      */
