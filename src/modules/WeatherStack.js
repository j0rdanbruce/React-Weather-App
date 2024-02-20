/**
 * JavaScript class to represent the Weather Stack Api
 */
import axios from 'axios';

const weatherStackAPI = require('../secret.js');

export default class WeatherStackAPI {
    constructor() {
        this.baseUrl = 'http://api.weatherstack.com/';
        this.apiKey = weatherStackAPI;
    }

    getCurrentWeatherData(city) {
        axios.get(this.baseUrl + 'current?access_key=' + this.apiKey + '&query=' + city)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'Network Error';
            })
    }
}