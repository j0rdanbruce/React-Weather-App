/**
 * React component to display the current weather
 */

//imports go here
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

//image imports
import rainCloud from '../../images/rainCloud.png';
import partlyCloudy from '../../images/partlyCloudy.png';
import sun from '../../images/sun.png';


/**
 * The image thumbnail component for the current weather forecast component
 */

const weatherThumbnail = () => {
	const currentWeatherMap = new Map([
		['Sunny', sun],
		['Partly cloudy', partlyCloudy],
		['Rain', rainCloud],
	]);

	return <Image src="" alt="" />
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
		<Card>
			<Card.Body>
				<Card.Text>
					{currentWeather ? JSON.stringify(currentWeather.current) : null}
				</Card.Text>
			</Card.Body>
		</Card>
	);
} 

export default CurrentWeather;