import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";



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
				setNearbyCities(data)
			})
			.catch((error) => {
				console.log(error);
			})
		}, [location]);

	return (
		<Card>
			<Card.Title>
				Nearby Cities
			</Card.Title>
			<Card.Body>
				{JSON.stringify(nearbyCities)}
			</Card.Body>
		</Card>
	);
}

export default NearbyLocations;