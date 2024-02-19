import { useState } from "react";
import LocationForm from "./components/LocationForm/LocationForm";

function App() {
  const [location, setLocation] = useState({
    city: "Nothing Yet",
  });

  return (
    <div className="App">
      <h1>{location.city}</h1>
      <LocationForm 
        setLocation={setLocation}
      />
    </div>
  );
}

export default App;
