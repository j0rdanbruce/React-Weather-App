/**
 * JavaScript class to represent the Weather Stack Api
 */
import weatherStackApiKey from '../secret';

class WeatherStackAPI {
    constructor() {
        this.baseUrl = 'http://api.weatherstack.com';
        this.apiKey = weatherStackApiKey;
    }
}