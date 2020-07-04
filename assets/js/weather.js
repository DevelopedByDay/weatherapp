var cityFormEl = document.querySelector("#weather-form");
var cityInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#weather-search-city");

function formSubmitHandler(event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getWeather(cityname);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a city name.")
    }
}


function getWeather(city) {
    var weather = "api.openweathermap.org/data/2.5/forecast?q=" + city +  "&appid=fe8d611a841b4f7219380686ae60e97a";

    fetch(weather).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, main)
            });
        }
        else {
            alert("Error: " + response.status);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
}

function displayWeather(cityweather, searchTerm) {
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    if (cityweather.length === 0) {
        weatherContainerEl.textContent = "No Weather information to be found.";
        return;
    }

    for (var i=0; i < cityweather.lenght; i++) {
        var 
    }
}