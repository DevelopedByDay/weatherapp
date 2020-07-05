var cityFormEl = document.querySelector("#weather-form");
var cityInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#weather-search-city");

var cityList = [];

function formSubmitHandler(event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();

    if (cityname) {
        cityList = localStorage.getItem("city")
        cityList = cityList ? cityList.split(",") : [];
        cityList.push(cityname);
        localStorage.setItem("city", cityList.toString());
        getToday(cityname);
        getWeather(cityname);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name.")
    }
}

function getToday(city) {
    var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fe8d611a841b4f7219380686ae60e97a";

    fetch(weather).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayToday(data, city);
            })
        }
        else {
            alert ("Error: " + response.status);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
}


function getWeather(city) {
    var weather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +  "&appid=fe8d611a841b4f7219380686ae60e97a";


    fetch(weather).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);
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

function displayToday(cityweather, searchTerm) {
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    var weatherDay = cityweather.dt_txt;
    var todayEl = document.createElement("div");
    todayEl.classList = "card";

    var weatherTemp = cityweather.main.temp;

    var weatherCondition = cityweather.weather.main;
    var weatherIcon = cityweather.weather.icon;

    var todayObj = weatherDay + weatherTemp + weatherCondition + weatherIcon;
    console.log(todayObj);
    console.log(weatherCondition);
    console.log(weatherTemp);


    todayEl.appendChild(todayObj);

    weatherContainerEl.appendChild(todayEl);


}

function displayWeather(cityweather, searchTerm) {
    
    

    if (cityweather.length === 0) {
        weatherContainerEl.textContent = "No Weather information to be found.";
        return;
    }



    for (var i=0; i < cityweather.lenght; i++) {
        var weatherDay = cityweather[i].dt_txt;

        var weatherEl = document.createElement("div");
        weatherEl.classList = "card";
        
        var weatherTemp = cityweather[i].main;

        var weatherCondition = cityweather[i].weather;

        var weatherObj = weatherDay + weatherTemp + weatherCondition;
        console.log(weatherObj);
        console.log(weatherCondition);
        console.log(weatherTemp);


        weatherEl.appendChild(weatherObj);

        weatherContainerEl.appendChild(weatherEl);
    }
}

cityFormEl.addEventListener("submit", formSubmitHandler);