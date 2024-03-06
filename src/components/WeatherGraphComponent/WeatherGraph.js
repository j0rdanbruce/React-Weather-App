import { useEffect, useState } from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import Card from "react-bootstrap/Card";

const LineGraph = ({weatherData}) => {

	return (
		<LineChart
			width={900}
			height={300}
			data={weatherData}
			margin={{ top: 30, right: 35, bottom: 25, left: -30 }}
		>
			<Line type="monotone" dataKey="temp" stroke="#8884d8"/>
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis dataKey="datetime" />
    	<YAxis dataKey="temp" />
			<Tooltip />
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
			style={{
				position: 'relative',
				bottom: 0,
				marginLeft: 'auto',
				marginRight: 'auto',
				width: '900px',
				height: '300px'
			}}
		>
			<Card.Body>
				{weatherData ? <LineGraph weatherData={weatherData.days[0].hours} /> : 'Weather Data'}
			</Card.Body>
		</Card>
	);
}

export default WeatherGraph;