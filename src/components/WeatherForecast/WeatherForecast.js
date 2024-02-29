//imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";

function getCurrentDate() {
	const dateObj = new Date();
	return String(dateObj.toISOString().split('T')[0]);
}

function getFutureDate(numDaysFromNow) {
  const futureDate = moment().add(numDaysFromNow, 'days').calendar().split('/');
  return `${futureDate[2]}-${futureDate[0]}-${futureDate[1]}`; //formats the date as 'YYYY/MM/DD'
}

/**
 * The default Weather Forecast component.
 */

const WeatherForecast = ({location}) => {
  const [forecast, setForecast] = useState({
    dateRange: '7',
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

    location.city && fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${location.city}&forecastDays=${String(forecast.dateRange)}&aggregateHours=24&unitGroup=us&shortColumnNames=false&contentType=json&key=${visualCrossingApiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setForecast({
          ...forecast,
          weatherData: data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }, [location, forecast]);

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