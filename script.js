
var currentForecastBox = document.getElementById("current-weather");

//FUNCTIONS////////////////////////////////////////////////////////////////

function storeSearchHistory(historyValueToStore) {

    console.log("storeSearchHistory is working: "+historyValueToStore);

    if (!historyValueToStore) {
        alert("Enter city, state, country. Try again.");
        return;
    }

    var searchHistoryKey = "cities";
    var previousCities = JSON.parse(localStorage.getItem(searchHistoryKey));

    if (!previousCities) {
        previousCities = [];
    }

    previousCities.push(historyValueToStore);
    localStorage.setItem(searchHistoryKey, JSON.stringify(previousCities));
    console.log("This is the list for " + previousCities);
}

//the following function will render the search history with clickable previous cities
function drawSearchHistory() {

}

//the following function will render the current weather for the searched city
function drawCurrentForecast(city_name, date, temp, wind, humidity, uv_index) {

    console.log("drawCurrentForecast is working");

    //generates the City Name when search is clicked
    const paraCity = document.createElement("p");
    const nodeCity = document.createTextNode("Current weather conditions for: " + city_name);
    paraCity.appendChild(nodeCity);
    document.getElementById("current-weather").appendChild(paraCity);

    //generates the Date when search clicked
    const paraDate = document.createElement("p");
    const nodeDate = document.createTextNode("Date: " + date);
    paraDate.appendChild(nodeDate);
    document.getElementById("current-weather").appendChild(paraDate);

    //generates the Temp when search clicked
    const paraTemp = document.createElement("p");
    const nodeTemp = document.createTextNode("Temp: " + temp);
    paraTemp.appendChild(nodeTemp);
    document.getElementById("current-weather").appendChild(paraTemp);

    //generates the Wind when search clicked
    const paraWind = document.createElement("p");
    const nodeWind = document.createTextNode("Wind: " + wind);
    paraWind.appendChild(nodeWind);
    document.getElementById("current-weather").appendChild(paraWind);

    //generates the Humidity when search clicked
    const paraHumidity = document.createElement("p");
    const nodeHumidity = document.createTextNode("Humidity: " + humidity);
    paraHumidity.appendChild(nodeHumidity);
    document.getElementById("current-weather").appendChild(paraHumidity);

    //generates the uv_index when search clicked
    const paraUVIndex = document.createElement("p");
    const nodeUVIndex = document.createTextNode("UV Index: " + uv_index);
    paraUVIndex.appendChild(nodeUVIndex);
    document.getElementById("current-weather").appendChild(paraUVIndex);

}

//the following function will render the five day forecast for the searched city
function drawFiveDayForecast() {

    var predictionFiveDayBox = document.getElementById("five-day-forecast");
    console.log("drawFiveDayForecast is working");

}

//the following function will be performed when seach is clicked (event listener at bottom in the logic portion)
function search() {
    console.log("i have been clicked");
    currentForecastBox.innerHTML = "";
    drawCurrentForecast();

    const inputBoxValue = document.getElementById("input-box");
    const cityName = inputBoxValue.value.trim();

    storeSearchHistory(cityName);

    var previousCities = localStorage.getItem("cities");

    for (let index = 0; index < previousCities.length; index++) {
        var searchHistoryBox = document.getElementById("search-history");
        const searchHistory = previousCities[index];
        const newLi = searchHistoryBox.createElement("li");
        newLi.textContent = searchHistory;
        searchHistoryBox.appendChild(newLi);
    }
}

//LOGIC////////////////////////////////////////////////////////////////////
//VARIABLES/////////////////////////////////////////////////////////////////
$(document).ready(function () {

    const start_btn = document.getElementById('search-button');

    start_btn.addEventListener('click', search);

});

