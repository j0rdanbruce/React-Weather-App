/**
 * React component to display the current weather
 */

//imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const CurrentWeather = ({
	className,
	location,
}) => {

	const [currentWeather, setCurrentWeather] = useState(null);

	useEffect(() => {
		location.city && fetch('http://api.weatherstack.com/current?access_key=bfc1359347b2fac139c86edd5d68eb81&query=' + location.city)
			.then((response) => response.json())
			.then((data) => {
				setCurrentWeather(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [location]);

	return (
		<Card>
			<Card.Body>
				<Card.Text>
					{currentWeather ? JSON.stringify(currentWeather) : null}
				</Card.Text>
			</Card.Body>
		</Card>
	);
} 

export default CurrentWeather;