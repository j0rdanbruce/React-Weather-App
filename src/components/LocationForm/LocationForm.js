//imports go here
import { useState } from "react";


const LocationForm = ({location, setLocation}) => {
	const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';
	const [city, setCity] = useState("");

	const handleLocationSearch = (event) => {
		event.preventDefault();
		city && fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city}/today?key=${visualCrossingApiKey}&include=current`)
			.then((response) => response.json())
			.then((data) => {
				setLocation({
					city: city,
					latitude: data.latitude,
					longitude: data.longitude,
					weatherCondition: data.currentConditions.conditions
				});
			})
			.catch((error) => {
				console.error(error);
			})
	}

	return (
			<form className="location-form" onSubmit={handleLocationSearch}>
					<label>
						Location:
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</label>
					<input type="submit" value="Search"/>
			</form>
	);
}

export default LocationForm;