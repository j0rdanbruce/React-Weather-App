//imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import WeatherThumbnail from "../WeatherThumbnail/WeatherThumbnail";

/**
 * The component for the single day weather description of the entire forecast
 */

const SingleDayForecast = ({weatherData}) => {
  const dateObj = new Date(weatherData.datetime);

  function getDate(dateObj) {
    const monthMap = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    }
    return (`${monthMap[dateObj.getMonth()]} ${dateObj.getDate()}`);
  }
  
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        height: '40px',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <WeatherThumbnail
        weatherCondition={weatherData.conditions}
      ></WeatherThumbnail>
      <Card.Body>
        <Card.Text>
          {JSON.stringify(getDate(dateObj))}
          {JSON.stringify(weatherData.temp)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


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
        const originalData = data.locations[location.city].values;  //'originalData' includes the current day as well. Current weather day is already displayed in another component.
        const convertedData = originalData.slice(1, originalData.length);
        setForecast({
          weatherData: convertedData,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }, [location]);

  return (
    <Card
      style={{
        position: 'absolute',
        top: '20px',
        left: '400px'
      }}
    >
      <Card.Body>
        <Card.Title>Forecast</Card.Title>
        {forecast.weatherData && forecast.weatherData.map((singleDayForecast) => {
          return (
            <SingleDayForecast
              weatherData={singleDayForecast}
            />
          );
        })}
      </Card.Body>
    </Card>
  );  
}

export default WeatherForecast;