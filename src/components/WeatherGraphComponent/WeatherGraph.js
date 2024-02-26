import { useEffect, useState } from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import Card from "react-bootstrap/Card";

const LineGraph = ({weatherData}) => {

	return (
		<LineChart width={900} height={300} data={weatherData} >
			<Line type="monotone" dataKey="temp" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="datetime" />
    	<YAxis dataKey="temp" />
		</LineChart>
	);
}

const WeatherGraph = ({className, location}) => {

	const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';

	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		location.city && fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city}/today?key=${visualCrossingApiKey}`)
			.then((response) => response.json())
			.then((data) => {
				setWeatherData(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [location]);

	return (
		<Card
			className={className}
			style={{width: '100%', height: 'auto'}}
		>
			<Card.Body>
				{weatherData ? <LineGraph weatherData={weatherData.days[0].hours} /> : 'Weather Data'}
			</Card.Body>
		</Card>
	);
}

export default WeatherGraph;