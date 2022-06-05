"use strict";

let map = L.map('map').setView([50, 10], 5); // Einbinden von Karte mit[Längengr.,Breitengr., Zoom-level]
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZgpkwwlQ5AVfCe65euIj', {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    // attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
}).addTo(map);
let marker = L.marker([48.6, 9]).addTo(map); // marker mit Start-Koordinaten



let getWeather = () => {
    let location = document.querySelector("#inputPlace").value;
    let lat;
    let lon;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7581766e5a312d1a4952892437e6025a&units=metric&lang=DE`
    )
        .then((response) => response.json())
        .then((json) => {
            console.log("Aktuelles Wetter :");
            console.log(json.weather[0].description); // Wetterbeschreibung (z.B. Klarer Himmel)
            console.log("Aktuelle Temperatur " + json.main.temp.toFixed(0) + "°C"); // aktuelle Temperatur
            console.log(
                "Gefühlte Temperatur " + json.main.feels_like.toFixed(0) + "°C"
            );
            fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${location},DE&limit=1&appid=7581766e5a312d1a4952892437e6025a&units=metric&lang=DE`
            )
                .then((response) => response.json())
                .then((json) => {
                    lat = json[0].lat;
                    lon = json[0].lon;
                    // AB HIER WETTER VORHERSAGE
                    console.log("Ab hier Wettervorhersage");
                    fetch(
                        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7581766e5a312d1a4952892437e6025a&units=metric&lang=DE`
                    )
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json.list);
                            console.log(lat, lon);
                            marker.setLatLng([lat, lon]); //Marker auf der Map
                        });

                });
        });

    // console.log(marker);

};



// fetch(`http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid=`)

//     .then((response) => response.json())
//     .then((json) => {
//         console.log(json.list);
//     });




let div = document.querySelector('#div')
// window.onload = function () {
//     setTimeout(() => {
//         console.log('hi')
//         div.style.backgroundColor = 'red';
//     }, 3000)
// };