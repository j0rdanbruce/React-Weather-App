import { useState } from "react";
import LocationForm from "./components/LocationForm/LocationForm";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import './components/CurrentWeather/CurrentWeather.css';
import WeatherGraph from "./components/WeatherGraphComponent/WeatherGraph";

import sunnySky from "../src/images/sunnySky.jpg";

function App() {

  const [location, setLocation] = useState({
    city: null,
  });

  return (
    <div className="App" style={{backgroundImage: `url(${sunnySky})`}}>
      <h1>{location.city}</h1>
      <LocationForm
        location={location}
        setLocation={setLocation}
      />
      <CurrentWeather 
        className="current-weather"
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
