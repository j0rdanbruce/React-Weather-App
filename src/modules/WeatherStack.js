/**
 * JavaScript class to represent the Weather Stack Api
 */
import weatherStackApiKey from '../secret';
import axios from 'axios';

class WeatherStackAPI {
    constructor() {
        this.baseUrl = 'http://api.weatherstack.com/';
        this.apiKey = weatherStackApiKey;
    }

    getCurrentWeatherData(city) {
        axios.get(this.baseUrl + 'current?access_key=' + this.apiKey + '&query=' + city)
            .then(response => {
                const weatherData = response.data;
            })
        return weatherData;
    }
}