//imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
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
    dateRange: 7,
    weatherData: null
  });

  function handleDateRangeToggle(newDateRangeValue) {
    setForecast({
      ...forecast,
      dateRange: newDateRangeValue
    });
  }
  
  useEffect(() => {
    const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';

    location.city && fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${location.city}&forecastDays=10&aggregateHours=24&unitGroup=us&shortColumnNames=true&contentType=json&key=${visualCrossingApiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const originalData = data.locations[location.city].values;  //'originalData' includes the current day as well. Current weather day is already displayed in another component.
        const convertedData = originalData.slice(1, originalData.length);
        setForecast((forecast) => ({
          ...forecast,
          weatherData: convertedData,
        }));
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
        left: '360px',
        width: '300px',
      }}
    >
      <Card.Body>
        <Card.Title>Forecast</Card.Title>
        <ToggleButtonGroup type="radio" name="dateRangeOptions" defaultValue={7} size="sm"
          style={{
            position: 'absolute',
            top: '10px',
            right: '30px'
          }}
        >
          <ToggleButton
            id="tbg-radio-1"
            value={7}
            onChange={(event) => handleDateRangeToggle(event.target.value)}
          >7 Days</ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value={10}
            onChange={(event) => handleDateRangeToggle(event.target.value)}
          >10 Days</ToggleButton>
        </ToggleButtonGroup>
        {forecast.weatherData && forecast.weatherData.slice(0, forecast.dateRange).map((singleDayForecast) => { //slice method takes beginning or array and end dateRange value of forecast state.
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