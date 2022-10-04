export {
    uiButtonLookup,
    uiInputField,
    uiInputFieldClear,
    uiUpdateHeader,
    uiDisplayWeather,
    uiDisplayError,
    uiInit
}

import { generateHtmlTable } from "../../lib/table_generator.js";

let uiButtonLookup,
    uiInputField,
    div_header,
    div_blocks,
    div_error,
    div_geo,
    div_weather,
    div_air;

const capitalizeString = (str) => {
    let c = str[0].toUpperCase();
    return c + str.slice(1);
}

const removeChildren = (element) => {
    if ( element ) {
        while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
        }
    }
}

const createTableGeo = (weatherData) => {
    const table_geo = generateHtmlTable(weatherData, ["Country", "Longitude", "Latitude", "Sunrise", "Sunset"]);
    table_geo.id = "table_geo";
    return table_geo;
}

const createTableWeather = (weatherData) => {
    const table_weather = generateHtmlTable(weatherData, ["Weather", "Description", "Temp", "Feel", "Min", "Max"]);
    table_weather.id = "table_weather";
    return table_weather;
}

const createTableAir = (weatherData) => {
    const table_air = generateHtmlTable(weatherData, ["AirPressure", "Humidity", "WindSpeed", "WindDeg"]);
    table_air.id = "table_air";
    return table_air;
}

const clearAndHideDivs = () => {
    removeChildren(div_geo);
    removeChildren(div_weather);
    removeChildren(div_air);

    div_geo.style.display = "none";
    div_weather.style.display = "none";
    div_air.style.display = "none";
}

const clearAndHideError = () => {
    div_error.innerText = "";
    div_error.style.display = "none";
}

const createTablesFromData = (weatherData) => {
    clearAndHideDivs();
    div_geo.appendChild(createTableGeo(weatherData));
    div_weather.appendChild(createTableWeather(weatherData));
    div_air.appendChild(createTableAir(weatherData));

    const display_style       = "inline-block";
    div_geo.style.display     = display_style
    div_weather.style.display = display_style
    div_air.style.display     = display_style;
}

const setError = (msg) => {
    clearAndHideDivs();
    div_error.innerText = msg;
    div_error.style.display = "inline-block";
}

const uiInputFieldClear = () => uiInputField.value = "";

const uiUpdateHeader = (msg) => div_header.innerText = capitalizeString(msg);

const uiDisplayWeather = (weatherData) => {
    clearAndHideError();
    createTablesFromData(weatherData);
}

const uiDisplayError = (msg) => setError(msg);

const uiInit = () => {
    uiButtonLookup = document.querySelector("#button_lookup");
    uiInputField   = document.querySelector("#input_field");
    div_header     = document.querySelector("#div_header");
    div_blocks     = document.querySelector("#div_blocks");
    div_error      = document.querySelector("#div_error");
    div_geo        = document.querySelector("#div_geo");
    div_weather    = document.querySelector("#div_weather");
    div_air        = document.querySelector("#div_air");
}