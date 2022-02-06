
const currentForecastBox = document.getElementById("current-weather");
const searchInputBox = document.getElementById("input-box");
const searchHistoryBox = document.getElementById("search-history");

var searchHistoryKey = "cities";    // key for localstorage to store previous cities searched

//FUNCTIONS////////////////////////////////////////////////////////////////

function storeSearchHistory(historyValueToStore) {

    console.log("storeSearchHistory is working: " + historyValueToStore);

    if (!historyValueToStore) {
        alert("Enter city, state, country. Try again.");
        return;
    }


    var previousCities = JSON.parse(localStorage.getItem(searchHistoryKey));

    if (!previousCities) {
        previousCities = [];
    }

    if (previousCities.length >= 1) {
        if (previousCities.indexOf(historyValueToStore) >= 0) {
            return
        }
    }

    previousCities.push(historyValueToStore);
    localStorage.setItem(searchHistoryKey, JSON.stringify(previousCities));
    console.log("This is the list for " + previousCities);
}

function retrieveSearchHistroy() {

    return JSON.parse(localStorage.getItem(searchHistoryKey));

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
    const cityName = searchInputBox.value.trim();

    currentForecastBox.innerHTML = "";
    drawCurrentForecast();

    

    storeSearchHistory(cityName);

    searchHistoryBox.innerHTML = "";
    renderSearchHistoryList();

}

//the following function renders the search history into a list
function renderSearchHistoryList() {

    var previousCities = retrieveSearchHistroy();

    if (!previousCities) {
        return
    }

    var searchHistoryBox = document.getElementById("search-history");
    var searchHistory;
    var newButton;

    for (let index = 0; index < previousCities.length; index++) {
        searchHistory = previousCities[index];
        newButton = document.createElement("button");
        newButton.textContent = searchHistory;
        newButton.addEventListener("click", searchCityAgain(searchHistory));
        searchHistoryBox.appendChild(newButton);
    }
}

//function to search for the weather and forecast for a previously searched city that is in the search history button list
function searchCityAgain(searchCriteria) {
    return function () {

        searchInputBox.value = searchCriteria;
        search();
    }
}

//5 day weather forecast from Open Weather, calls by city name ONLY//needs work...
function getFiveDayForecast() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("api.openweathermap.org/data/2.5/forecast?q=Denver&appid=61bd5a7935f37e9c18cacd14e8c89bc3", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))

}

//LOGIC////////////////////////////////////////////////////////////////////
//VARIABLES/////////////////////////////////////////////////////////////////
$(document).ready(function () {

    const start_btn = document.getElementById('search-button');

    start_btn.addEventListener('click', search);

    renderSearchHistoryList();

});



