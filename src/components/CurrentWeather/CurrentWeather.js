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
import eye from '../../images/eye.png';
import windIcon from '../../images/windIcon.png';
import humidityIcon from '../../images/humidityIcon.png';
import uvIndexIcon from '../../images/uvIndexIcon.png';

//misc. imports go here


/**
 * The image thumbnail component for the current weather forecast component
 */

const WeatherThumbnail = ({weatherDescription}) => {
	const weatherMap = new Map([
		['Clear', sun],
		['Partially cloudy', partlyCloudy],
		['Rain', rainCloud],
		['Overcast', overcast]
	]);

	return (
		<Card.Img
			className="weather-thumbnail"
			src={weatherMap.get(weatherDescription)}
			alt=""
			style={{ 'width': '100px' }} />
	);
}

/**
 * The measurment unit component for temperature.
 */

	const TemperatureUnit = () => {
		return (
			<p className="temperature-unit">°F</p>
		);
	}

/**
 * The Temperature and weather description component
 */

const Temperature = ({currentWeather}) => {
	
	return (
		<div className="temperature-component">
			<p className="actual-temperature"> {currentWeather ? currentWeather.temp : null} </p>
			<TemperatureUnit />
			<p className="weather-description"> {currentWeather ? currentWeather.conditions : null} </p>
		</div>
	);
}

const AdditionalWeatherData = ({currentWeather}) => {
	if (!currentWeather) {
		return (
			<></>
		);
	}

	const weatherIconsAndInfo = [
		{icon: humidityIcon, info: `${JSON.stringify(currentWeather.humidity)}%`},
		{icon: windIcon, info: `${JSON.stringify(currentWeather.windspeed)}mph`},
		{icon: eye, info: JSON.stringify(currentWeather.visibility)},
		{icon: uvIndexIcon, info: JSON.stringify(currentWeather.uvindex)},
	]

	return (
		<div className="additional-weather-data">
			{weatherIconsAndInfo.map((item) => (
				<div className="individual-weather-item">
					<img
						src={item.icon} alt=""
						style={{'height': '30px', 'width': 'auto'}}
					/>
					<p>{item.info}</p>
				</div>
			))}
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

	const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';
	const date = new Date();

	const [currentWeather, setCurrentWeather] = useState(null);

	useEffect(() => {
		location.city && fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city}/today?key=${visualCrossingApiKey}&include=current`)
			.then((response) => response.json())
			.then((data) => {
				setCurrentWeather(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [location]);

	return (
		<Card
			className={className}
			style={{ 'height' : '250px' }}>
			<Card.Body>
				<Card.Title className="current-weather-title" > Current Weather </Card.Title>
				<Card.Subtitle> {JSON.stringify(date)} </Card.Subtitle>
				<WeatherThumbnail
					weatherDescription={currentWeather ? currentWeather.currentConditions.conditions : null}
				/>
				<Temperature 
					currentWeather={currentWeather ? currentWeather.currentConditions : null}
				/>
				<AdditionalWeatherData
					currentWeather={currentWeather ? currentWeather.currentConditions : null}
				/>
			</Card.Body>
		</Card>
	);
} 

export default CurrentWeather;