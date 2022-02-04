//VARIABLES/////////////////////////////////////////////////////////////////
var currentForecastBox;
var predictionFiveDayBox;
var searchHistoryBox;
//FUNCTIONS////////////////////////////////////////////////////////////////

//the following function will render the search history with clickable previous cities
function drawSearchHistory() {

    searchHistoryBox = document.getElementById("");

}
//the following function will render the current weather for the searched city
function drawCurrentForecast(date, temp, wind, humidity, uv_index) {

    currentForecastBox = document.getElementById("current-weather");


}

//the following function will render the five day forecast for the searched city
function drawFiveDayForecast() {

    predictionFiveDayBox = document.getElementById("five-day-forecast");

}

//the following function will be performed when seach is clicked (event listener at bottom in the logic portion)
function search() {
    drawCurrentForecast("02/15/30", 30, 31, 32, 33);
    drawFiveDayForecast();
    drawSearchHistory();
}

//LOGIC////////////////////////////////////////////////////////////////////



