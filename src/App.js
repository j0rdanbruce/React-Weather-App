import { useEffect, useState } from "react";
import LocationForm from "./components/LocationForm/LocationForm";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import './components/CurrentWeather/CurrentWeather.css';
import WeatherGraph from "./components/WeatherGraphComponent/WeatherGraph";
import './components/WeatherGraphComponent/WeatherGraph.css';
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import NearbyLocations from "./components/NearbyLocations/NearbyLocations";
import './components/NearbyLocations/NearbyLocations.css';

/**
 * The main component of the Weather Application.
 * @returns the main weather app component.
 */

function App() {

  const [location, setLocation] = useState({
    city: null,
    latitude: null,
    longitude: null,
    weatherCondition: null,
  });

  function getWeatherBackgroundImage(weatherCondition) {
    const weatherConditionMap = new Map([
      ['Clear', require('./images/sunnySky.jpg')],
      ['Partially cloudy', require('./images/partlyCloudy.jpg')],
      ['Rain', require('./images/rainyDay.jpg')],
      ['Rain, Overcast', require('./images/rainyDay.jpg')],
      ['Overcast', require('./images/overcastDay.jpg')]
    ]);

    return (weatherConditionMap.get(weatherCondition));
  }

  useEffect(() => {
    const mainAppElement = document.getElementsByClassName('App')[0];
    mainAppElement.style.backgroundImage = `url(${getWeatherBackgroundImage(location.weatherCondition)})`
  }, [location]);

  return (
    <div className="App">
      <h1>{location.city}</h1>
      <LocationForm
        location={location}
        setLocation={setLocation}
      />
      <CurrentWeather 
        className="current-weather"
        location={location}
      />
      <WeatherForecast
        location={location}
      />
      <NearbyLocations 
        location={location}
      />
      <WeatherGraph
        className="weather-graph"
        location={location}
      />
    </div>
  );
}

export default App;
