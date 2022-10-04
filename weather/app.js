import { WeatherFetcher, WeatherData } from "./js/weather.js";
import {
    uiInputField,
    uiDisplayWeather,
    uiDisplayError,
    uiInit, uiUpdateHeader, uiInputFieldClear
} from "./js/view.js";

const lookUpHandler = () => {
    WeatherFetcher
        .getData(uiInputField.value)
        .then((data) => {
            uiDisplayWeather(new WeatherData(data));
            uiUpdateHeader(uiInputField.value);
            uiInputFieldClear();
        })
        .catch((message) => {
            uiDisplayError(message);
            uiUpdateHeader("Weather");
        });
}

const init = () => {
    uiInit();
    uiInputField.addEventListener("keydown", (keydownEvent) => {
        if ( keydownEvent.key === "Enter" ) lookUpHandler();
    });
}

init();
