
//VARIABLES/////////////////////////////////////////////////////////////////

const currentForecastBox = document.getElementById("current-weather");
const searchInputBox = document.getElementById("input-box");
const searchHistoryBox = document.getElementById("search-history");
const openWeatherAPIKey = "61bd5a7935f37e9c18cacd14e8c89bc3";
const search_button = document.getElementById('search-button');
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
        newButton.className = "citybtn";
        newButton.addEventListener("click", searchCityAgain(searchHistory));
        searchHistoryBox.appendChild(newButton);
    }
}


//the following function will render the current weather for the searched city
function drawCurrentForecast(city_name, date, temp, wind, humidity, uv_index) {

    console.log("drawCurrentForecast is working");

    //generates the City Name when search is clicked
    const paraCity = document.createElement("p");
    const nodeCity = document.createTextNode("Current weather conditions for: " + city_name);
    paraCity.appendChild(nodeCity);
    paraCity.className = "citybtn";
    document.getElementById("current-weather").appendChild(paraCity);

    //generates the Date when search clicked
    var dateFormatted = moment(date).format("L");

    const paraDate = document.createElement("p");
    const nodeDate = document.createTextNode("Date: " + dateFormatted);
    paraDate.appendChild(nodeDate);
    document.getElementById("current-weather").appendChild(paraDate);

    //generates the Temp when search clicked
    const paraTemp = document.createElement("p");
    const nodeTemp = document.createTextNode("Temp: " + temp + " °F");
    paraTemp.appendChild(nodeTemp);
    document.getElementById("current-weather").appendChild(paraTemp);

    //generates the Wind when search clicked
    const paraWind = document.createElement("p");
    const nodeWind = document.createTextNode("Wind: " + wind + " mph");
    paraWind.appendChild(nodeWind);
    document.getElementById("current-weather").appendChild(paraWind);

    //generates the Humidity when search clicked
    const paraHumidity = document.createElement("p");
    const nodeHumidity = document.createTextNode("Humidity: " + humidity + "%");
    paraHumidity.appendChild(nodeHumidity);
    document.getElementById("current-weather").appendChild(paraHumidity);

    //generates the uv_index when search clicked
    //const paraUVIndex = document.createElement("p");
    //const nodeUVIndex = document.createTextNode("UV Index: " + uv_index);
    //paraUVIndex.appendChild(nodeUVIndex);
    //document.getElementById("current-weather").appendChild(paraUVIndex);

}

//the following function will render the five day forecast for the searched city
function drawFiveDayForecast(data) {
    console.log("drawFiveDayForecast is working: ");
    console.log(data);

    index=0
    var baseOpenWeatherImageUrl = "https://openweathermap.org/img/w"
    
    //var formatZeroDate = moment(data[0].dt_txt).format("MM-DD-YYY");
    
    //5 day forecast date information
    var dayZeroDate = document.getElementById("day-0-date");
    dayZero = data[index].dt;
    dayZeroDate.innerHTML = moment(new Date(dayZero * 1000)).format("L");
    var dayOneDate = document.getElementById("day-1-date");
    dayOne = data[index+8].dt;
    dayOneDate.innerHTML = moment(new Date(dayOne * 1000)).format("L");
    var dayTwoDate = document.getElementById("day-2-date");
    dayTwo = data[index+16].dt;
    dayTwoDate.innerHTML = moment(new Date(dayTwo * 1000)).format("L");
    var dayThreeDate = document.getElementById("day-3-date");
    dayThree = data[index+24].dt;
    dayThreeDate.innerHTML = moment(new Date(dayThree * 1000)).format("L");
    var dayFourDate = document.getElementById("day-4-date");
    dayFour = data[index+32].dt;
    dayFourDate.innerHTML = moment(new Date(dayFour * 1000)).format("L");

    //5 day forecast temp information
    var dayZeroTemp = document.getElementById("day-0-temp");
    dayZeroTemp.innerHTML = "Temp: " + data[index].main.temp + " °F";
    var dayOneTemp = document.getElementById("day-1-temp");
    dayOneTemp.innerHTML = "Temp: " + data[index+8].main.temp + " °F";
    var dayTwoTemp = document.getElementById("day-2-temp");
    dayTwoTemp.innerHTML = "Temp: " + data[index+16].main.temp + " °F";
    var dayThreeTemp = document.getElementById("day-3-temp");
    dayThreeTemp.innerHTML = "Temp: " + data[index+24].main.temp + " °F";
    var dayFourTemp = document.getElementById("day-4-temp");
    dayFourTemp.innerHTML = "Temp: " + data[index+36].main.temp + " °F";

    //5 day forecast wind information
    var dayZeroWind = document.getElementById("day-0-wind");
    dayZeroWind.innerHTML = "Wind: " + data[index].wind.speed + " mph";
    var dayOneWind = document.getElementById("day-1-wind");
    dayOneWind.innerHTML = "Wind: " + data[index+8].wind.speed + " mph";
    var dayTwoWind = document.getElementById("day-2-wind");
    dayTwoWind.innerHTML = "Wind: " + data[index+16].wind.speed + " mph";
    var dayThreeWind = document.getElementById("day-3-wind");
    dayThreeWind.innerHTML = "Wind: " + data[index+24].wind.speed + " mph";
    var dayFourWind = document.getElementById("day-4-wind");
    dayFourWind.innerHTML = "Wind: " + data[index+36].wind.speed + " mph";

    //5 day forecast humidity information
    var dayZeroHumidity = document.getElementById("day-0-humidity");
    dayZeroHumidity.innerHTML = "Humidity: " + data[index].main.humidity + "%";
    var dayOneHumidity = document.getElementById("day-1-humidity");
    dayOneHumidity.innerHTML = "Humidity: " + data[index+8].main.humidity + "%";
    var dayTwoHumidity = document.getElementById("day-2-humidity");
    dayTwoHumidity.innerHTML = "Humidity: " + data[index+16].main.humidity + "%";
    var dayThreeHumidity = document.getElementById("day-3-humidity");
    dayThreeHumidity.innerHTML = "Humidity: " + data[index+24].main.humidity + "%";
    var dayFourHumidity = document.getElementById("day-4-humidity");
    dayFourHumidity.innerHTML = "Humidity: " + data[index+36].main.humidity + "%";

    //5 day forecast weather icon

    var dayZeroIcon = document.getElementById("day-0-icon");
    dayZeroIcon.innerHTML = data[index].weather[index].description;

    // var img1 = document.createElement("img");
    // img1.src = baseOpenWeatherImageUrl + "/" + data[index].weather[index].icon
    // dayZeroIcon.appendChild(img1)

    var dayOneIcon = document.getElementById("day-1-icon");
    dayOneIcon.innerHTML = data[index+8].weather[index].description;

    var dayTwoIcon = document.getElementById("day-2-icon");
    dayTwoIcon.innerHTML = data[index+16].weather[index].description;
    var dayThreeIcon = document.getElementById("day-3-icon");
    dayThreeIcon.innerHTML = data[index+24].weather[index].description;
    var dayFourIcon = document.getElementById("day-4-icon");
    dayFourIcon.innerHTML = data[index+36].weather[index].description;;

    


}

//the following function will be performed when seach is clicked (event listener at bottom in the logic portion)
async function search() {
    console.log("i have been clicked");
    const cityName = searchInputBox.value.trim();
    currentForecastBox.innerHTML = "";


    var currentData = await getCurrentForecast(cityName);
    drawCurrentForecast(currentData.name, new Date(), currentData.main.temp, currentData.wind.speed, currentData.main.humidity);
    
    var forecastData = await getFiveDayForecast(cityName);
    console.log(forecastData);
    drawFiveDayForecast(forecastData.list);
    
    storeSearchHistory(cityName);
    searchHistoryBox.innerHTML = "";

    renderSearchHistoryList();

}

//function to search for the weather and forecast for a previously searched city that is in the search history button list
function searchCityAgain(searchCriteria) {
    return function () {

        searchInputBox.value = searchCriteria;
        search();
    }
}

//5 day weather forecast from Open Weather, calls by city name ONLY//needs work...
async function getFiveDayForecast(cityName) {

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + openWeatherAPIKey + "&units=imperial";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var results = await fetch(url, requestOptions);
    return await results.json();

}

async function getCurrentForecast(cityName) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + openWeatherAPIKey + "&units=imperial";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var results = await fetch(url, requestOptions);
    return await results.json();

    
}

//LOGIC////////////////////////////////////////////////////////////////////
$(document).ready(async function () {

    search_button.addEventListener('click', search);
    renderSearchHistoryList();
    searchInputBox.value = "Denver";
    search();

});
