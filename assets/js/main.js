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
const wetterPlus3h = document.querySelector("#wetterPlus3h");
const gradPlus6h = document.querySelector("#gradPlus6h");
const zeitPlus6h = document.querySelector("#zeitPlus6h");
const wetterPlus6h = document.querySelector("#wetterPlus6h");
const gradPlus9h = document.querySelector("#gradPlus9h");
const zeitPlus9h = document.querySelector("#zeitPlus9h");
const wetterPlus9h = document.querySelector("#wetterPlus9h");
const gradPlus12h = document.querySelector("#gradPlus12h");
const zeitPlus12h = document.querySelector("#zeitPlus12h");
const wetterPlus12h = document.querySelector("#wetterPlus12h");

// 5 TAGE VORHERSAGE (short
const datumPlus1Day = document.querySelector("#datumPlus1Day");
const tempPlus1Day = document.querySelector("#tempPlus1Day");
const wetterPlus1Day = document.querySelector("#wetterPlus1Day");

const datumPlus2Day = document.querySelector("#datumPlus2Day");
const tempPlus2Day = document.querySelector("#tempPlus2Day");
const wetterPlus2Day = document.querySelector("#wetterPlus2Day");

const datumPlus3Day = document.querySelector("#datumPlus3Day");
const tempPlus3Day = document.querySelector("#tempPlus3Day");
const wetterPlus3Day = document.querySelector("#wetterPlus3Day");

const datumPlus4Day = document.querySelector("#datumPlus4Day");
const tempPlus4Day = document.querySelector("#tempPlus4Day");
const wetterPlus4Day = document.querySelector("#wetterPlus4Day");

const datumPlus5Day = document.querySelector("#datumPlus5Day");
const tempPlus5Day = document.querySelector("#tempPlus5Day");
const wetterPlus5Day = document.querySelector("#wetterPlus5Day");

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
          // locationname.innerHTML = json.name;
          // locationname;
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
                  // console.log(element.dt_txt);
                  // console.log(element.main.temp.toFixed(0) + "°C");
                  // console.log(element.weather[0].description);
                });
                console.log(json);
                gradPlus3h.innerHTML = `${json.list[0].main.temp.toFixed(0)}°C`;
                zeitPlus3h.innerHTML = `${json.list[0].dt_txt.slice(11, 16)}`;
                wetterPlus3h.innerHTML = `${json.list[0].weather[0].description}`;
                gradPlus6h.innerHTML = `${json.list[1].main.temp.toFixed(0)}°C`;
                zeitPlus6h.innerHTML = `${json.list[1].dt_txt.slice(11, 16)}`;
                wetterPlus6h.innerHTML = `${json.list[1].weather[0].description}`;
                gradPlus9h.innerHTML = `${json.list[2].main.temp.toFixed(0)}°C`;
                zeitPlus9h.innerHTML = `${json.list[2].dt_txt.slice(11, 16)}`;
                wetterPlus9h.innerHTML = `${json.list[2].weather[0].description}`;
                gradPlus12h.innerHTML = `${json.list[3].main.temp.toFixed(
                  0
                )}°C`;
                zeitPlus12h.innerHTML = `${json.list[3].dt_txt.slice(11, 16)}`;
                wetterPlus12h.innerHTML = `${json.list[3].weather[0].description}`;
                console.log(json.list);
                tempPlus1Day.innerHTML = `${json.list[7].main.temp.toFixed(
                  0
                )}°C`;
                wetterPlus1Day.innerHTML = json.list[7].weather[0].description;
                datumPlus1Day.innerHTML = json.list[7].dt_txt.slice(5, 10);
                tempPlus2Day.innerHTML = `${json.list[15].main.temp.toFixed(
                  0
                )}°C`;
                wetterPlus2Day.innerHTML = json.list[15].weather[0].description;
                datumPlus2Day.innerHTML = json.list[15].dt_txt.slice(5, 10);
                tempPlus3Day.innerHTML = `${json.list[23].main.temp.toFixed(
                  0
                )}°C`;
                wetterPlus3Day.innerHTML = json.list[23].weather[0].description;
                datumPlus3Day.innerHTML = json.list[23].dt_txt.slice(5, 10);
                tempPlus4Day.innerHTML = `${json.list[31].main.temp.toFixed(
                  0
                )}°C`;
                wetterPlus4Day.innerHTML = json.list[31].weather[0].description;
                datumPlus4Day.innerHTML = json.list[31].dt_txt.slice(5, 10);
                tempPlus5Day.innerHTML = `${json.list[39].main.temp.toFixed(
                  0
                )}°C`;
                wetterPlus5Day.innerHTML = json.list[39].weather[0].description;
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
