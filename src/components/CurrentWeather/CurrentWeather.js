/**
 * React component to display the current weather
 */

//imports go here
import Card from "react-bootstrap/Card";
import WeatherStackAPI from '../../modules/WeatherStack';


const CurrentWeather = ({
	className,
	location,
}) => {

	let weatherApi = new WeatherStackAPI();

	return (
		<Card>
			<Card.Body>
				<Card.Text>
					{weatherApi.getCurrentWeatherData(location.city)}
				</Card.Text>
			</Card.Body>
		</Card>
	);
} 

export default CurrentWeather;