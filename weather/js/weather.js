export {
    WeatherData,
    WeatherFetcher
}

const API_KEY = "91ffa981b9f3e20535f4496d68283f9f"; // yes, yes I know, hard coded api key - could obfuscate, but without a backend it would be there in some form
const API_URL = "https://api.openweathermap.org/data/2.5/weather"

class WeatherFetcher {
    static makeQueryString = (city) => API_URL + "?appid=" + API_KEY + "&q=" + city;

    static getData = (city) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.onreadystatechange = () => { // state handler
                if ( request.readyState === XMLHttpRequest.DONE ) {
                    if ( request.status === 200 ) {
                        const json = JSON.parse(request.responseText);
                        resolve(json);

                    } else {
                        reject("https://api.openweathermap.org/data/2.5/weather\n" + request.response);
                    }
                }
            }

            request.open("GET", WeatherFetcher.makeQueryString(city));
            request.send();
        });
    }
}

class WeatherData {
    static kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

    static convertTimeStamp = (timeStamp) => new Date(timeStamp * 1000).toLocaleTimeString("en-GB");

    static convertMphToKph = (mph) => (mph * 1.60934).toFixed(2);

    constructor(json) {
        // longitude, latitude
        this.Country   = json.sys.country;
        this.Longitude = json.coord.lon;
        this.Latitude  = json.coord.lat;
        // weather
        this.Weather     = json.weather[0].main;
        this.Description = json.weather[0].description;
        this.Temp        = WeatherData.kelvinToCelsius(json.main.temp) + " °C";
        this.Feel        = WeatherData.kelvinToCelsius(json.main.feels_like) + " °C";
        this.Min         = WeatherData.kelvinToCelsius(json.main.temp_min) + " °C";
        this.Max         = WeatherData.kelvinToCelsius(json.main.temp_max) + " °C";
        // adv
        this.AirPressure = json.main.pressure + " hPa";
        this.Humidity    = json.main.humidity + " %";
        this.WindSpeed   = WeatherData.convertMphToKph(json.wind.speed) + " km/h";
        this.WindDeg     = json.wind.deg + "°";
        this.Sunrise     = WeatherData.convertTimeStamp(json.sys.sunrise);
        this.Sunset      = WeatherData.convertTimeStamp(json.sys.sunset);
    }
}

