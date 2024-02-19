//imports go here
import { useState } from "react";


const LocationForm = ({setLocation}) => {
	const [city, setCity] = useState("");

	const handleLocationSearch = (event) => {
		event.preventDefault();
		setLocation({
			city: city,
		});
		setCity("");		//clears the search box so the city value set to empty string "".
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