//imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";


/**
 * The default Weather Forecast component.
 */

const WeatherForecast = ({location}) => {
  const [forecast, setForecast] = useState({
    weatherData: null
  });
  
  useEffect(() => {
    const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';
    const weatherToIconMap = new Map([
      ['Clear', require('../../images/sun.png')],
      ['Partially cloudy', require('../../images/partlyCloudy.png')],
      ['Rain', require('../../images/rainCloud.png')],
      ['Overcast', require('../../images/overcast.png')]
    ]);

    location.city && fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${location.city}&forecastDays=10&aggregateHours=24&unitGroup=us&shortColumnNames=true&contentType=json&key=${visualCrossingApiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setForecast({
          weatherData: data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }, [location]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Forecast</Card.Title>
        {forecast.weatherData ? JSON.stringify(forecast.weatherData) : null}
      </Card.Body>
    </Card>
  );  
}

export default WeatherForecast;