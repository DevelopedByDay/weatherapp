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
        row(cityname);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name.")
    }
}

// allows for generation of city list 
function row(city) {
    var cityEl = document.createElement("li")
    cityEl.classList.add("list-group-item", "list-group-item-action");
    var text = city;
    cityEl.textContent = text;
    var pastEl = document.querySelector('.past');
    pastEl.onclick = function(){
      if (event.target.tagName == "LI"){
      getToday(event.target.textContent)
      }
    }
    pastEl.appendChild(cityEl);
};

// function for retrieving weather for today
function getToday(city) {
    var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fe8d611a841b4f7219380686ae60e97a&units=imperial";

    fetch(weather)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        else {
            alert ("Error: " + response.status);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
    .then(function(data) {
        // for clearing prior data
        nowEl = document.querySelector("#now");
        nowEl.textContent = "";

        // create html for today's forcast
        var cityEl = document.createElement("h3")
        cityEl.classList.add("card-title");
        cityEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
        var sectionEl = document.createElement("div");
        sectionEl.classList.add("card");
        var windEl = document.createElement("p");
        windEl.classList.add("card-text");
        var humidEl = document.createElement("p");
        humidEl.classList.add("card-text");
        var tempEl = document.createElement("p");
        tempEl.classList.add("card-text");
        humidEl.textContent = "Humidity: " + data.main.humidity + " %";
        tempEl.textContent = "Temperature: " + data.main.temp + " °F";
        var dataEl = document.createElement("div");
        dataEl.classList.add("card-body");
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        // push data to sections
        cityEl.appendChild(iconEl)
        dataEl.appendChild(cityEl);
        dataEl.appendChild(tempEl);
        dataEl.appendChild(humidEl);
        dataEl.appendChild(windEl);
        sectionEl.appendChild(dataEl);
        nowEl.appendChild(sectionEl);

        getUV(data.coord.lat, data.coord.lon);
        })
}

// 5 day forcast function
function getWeather(city) {
    var weather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +  "&appid=fe8d611a841b4f7219380686ae60e97a&units=imperial";


    fetch(weather)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        else {
            alert ("Error: " + response.status);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
    .then(function(data) {
        var weatherEl = document.querySelector("#weather");
        weatherEl.innerHTML = "<h5>Your 5 Day Forecast:</h5>";
        forecastRowEl = document.createElement("div");

        for (var i = 0; i < data.list.length; i++) {
            if(data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                // create html for forcast
            var dayEl = document.createElement("div");
            dayEl.classList.add("col-md-2");
            var sectionEl = document.createElement("div");
            sectionEl.classList.add("card", "bg-primary", "text-white");
            var windEl = document.createElement("p");
            windEl.classList.add("card-text");
            windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + " MPH";
            var humidityEl = document.createElement("p");
            humidityEl.classList.add("card-text");
            humidityEl.textContent = "Humidity : " + data.list[i].main.humidity + " %";
            var fdayEl = document.createElement("div");
            fdayEl.classList.add("card-body", "p-2");
            var titleEl = document.createElement("h5");
            titleEl.classList.add("card-title");
            titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString()
            var iconEl = document.createElement("img")
            iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" )
            var displayEl = document.createElement("p");
            displayEl.classList.add("card-text");
            displayEl.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
            var sectionTwoEl = document.createElement("p");
            sectionTwoEl.classList.add("card-text");
            sectionTwoEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            

            // push data to sections
            dayEl.appendChild(sectionEl);
            fdayEl.appendChild(titleEl);
            fdayEl.appendChild(iconEl);
            fdayEl.appendChild(windEl);
            fdayEl.appendChild(humidityEl);
            fdayEl.appendChild(displayEl);
            fdayEl.appendChild(sectionTwoEl);
            sectionEl.appendChild(fdayEl);
            weatherEl.appendChild(dayEl);
            }

        
        }
    })
}

// UV function for displaying in the today's forcast
function getUV(lat, lon) {
    var weather = "http://api.openweathermap.org/data/2.5/uvi?appid=fe8d611a841b4f7219380686ae60e97a&lat=" + lat + "&lon=" + lon;
    fetch(weather)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        else {
            alert ("Error: " + response.status);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
    .then(function(data) {
      var fdayEl = document.querySelector(".card-body");
      var uvEl = document.createElement("p");
      uvEl.textContent = "UV Index: "
      var buttonEl = document.createElement("span");
      buttonEl.classList.add("btn", "btn-sm");
      buttonEl.innerHTML = data.value;
  
      if (data.value < 3) {
        buttonEl.classList.add("btn-success");
      }
      else if (data.value < 7) {
        buttonEl.classList.add("btn-warning");
      }
      else {
        buttonEl.classList.add("btn-danger");
      }
  
      fdayEl.appendChild(uvEl);
      uvEl.appendChild(buttonEl);
    })
  }

cityFormEl.addEventListener("submit", formSubmitHandler);