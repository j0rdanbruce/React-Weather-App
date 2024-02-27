import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";


const CityCards = ({cities}) => {
	const weatherToIconMap = new Map([
		['Clear', require('../../images/sun.png')],
		['Partially cloudy', require('../../images/partlyCloudy.png')],
		['Rain', require('../../images/rainCloud.png')],
		['Overcast', require('../../images/overcast.png')]
	])

	function getWeatherDescription(location) {
		const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';
		let currentWeather;

		fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=${visualCrossingApiKey}&include=current`)
			.then((response) => response.json())
			.then((data) => {
				currentWeather = data.currentConditions.conditions;
			})
			.catch((error) => {
				console.error(error);
			});
		return JSON.stringify(currentWeather);
	}

	if (!cities) {
		return null;
	}
	return (
		cities.map((city) => (
			<Card>
				<Card.Text>
					{`${city.name}, ${city.region}`}
				</Card.Text>
				<Card.Text>
					{getWeatherDescription(`${city.name}, ${city.region}`)}
				</Card.Text>
			</Card>
		))
	);
}

const NearbyLocations = ({location}) => {
	const [nearbyCities, setNearbyCities] = useState(null);

	useEffect(() => {
		const geoDBUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${location.latitude}${location.longitude}/nearbyPlaces?radius=25&limit=5`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '5d6a3ca186msh1b3c1471d5f805ap13011fjsnd44aeffe3e9a',
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
			}
		};
		fetch(geoDBUrl, options)
			.then((response) => response.json())
			.then((data) => {
				setNearbyCities(data.data)
			})
			.catch((error) => {
				console.log(error);
			})
		}, [location]);

	return (
		<Card
			style={{
				padding: '10px',
				width: '460px',
				height: 'auto',
			}}
		>
			<Card.Title>
				Nearby Cities
			</Card.Title>
			<Card.Body>{JSON.stringify(nearbyCities)}</Card.Body>
			<CityCards 
				cities={nearbyCities}
			/>
		</Card>
	);
}

export default NearbyLocations;