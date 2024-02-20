import { useState } from "react";
import LocationForm from "./components/LocationForm/LocationForm";
import WeatherGraph from "./components/WeatherGraphComponent/WeatherGraph";
import './components/WeatherGraphComponent/WeatherGraph.css'
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

function App() {

  const [location, setLocation] = useState({
    city: null,
  });

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
      <WeatherGraph
        className="weather-graph"
        location={location}
      />
    </div>
  );
}

export default App;
