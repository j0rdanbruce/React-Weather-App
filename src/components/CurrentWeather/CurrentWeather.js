/**
 * React component to display the current weather
 */

//React imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

//image imports
import rainCloud from '../../images/rainCloud.png';
import partlyCloudy from '../../images/partlyCloudy.png';
import sun from '../../images/sun.png';
import overcast from '../../images/overcast.png';


/**
 * The image thumbnail component for the current weather forecast component
 */

const WeatherThumbnail = ({weatherDescription}) => {
	const weatherMap = new Map([
		['Sunny', sun],
		['Partly cloudy', partlyCloudy],
		['Rain', rainCloud],
		['Overcast', overcast]
	]);

	return (
		<Card.Img
			className="weather-thumbnail"
			src={weatherMap.get(weatherDescription)}
			alt=""
			style={{ 'width': '75px' }} />
	);
}

/**
 * The Temperature and weather description component
 */

const Temperature = ({currentWeather}) => {
	

	return (
		<div className="temperature-component">
			<p className="actual-temperature"> {currentWeather ? currentWeather.temperature : null} </p>
			<p className="weather-description"> {currentWeather ? currentWeather.weather_descriptions[0] : null} </p>
		</div>
	);
}


/**
 * The main current weather react component
 */

const CurrentWeather = ({
	className,
	location,
}) => {

	const [currentWeather, setCurrentWeather] = useState(null);

	useEffect(() => {
		location.city && fetch(`http://api.weatherstack.com/current?access_key=bfc1359347b2fac139c86edd5d68eb81&query=${location.city}`)
			.then((response) => response.json())
			.then((data) => {
				setCurrentWeather(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [location]);

	return (
		<Card className={className}>
			<Card.Body>
				<Card.Title className="current-weather-title" > Current Weather </Card.Title>
				<Card.Subtitle> {currentWeather ? currentWeather.current.observation_time : null} </Card.Subtitle>
				<WeatherThumbnail
					weatherDescription={currentWeather ? currentWeather.current.weather_descriptions[0] : null}
				/>
				<Temperature 
					currentWeather={currentWeather ? currentWeather.current : null}
				/>
				<Card.Text>
					{currentWeather ? JSON.stringify(currentWeather.current) : null}
				</Card.Text>
			</Card.Body>
		</Card>
	);
} 

export default CurrentWeather;