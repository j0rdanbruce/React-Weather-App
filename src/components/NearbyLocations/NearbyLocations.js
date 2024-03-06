import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";


const CityCard = ({city}) => {
  const [cityData, setCityData] = useState({
    name: null,
    weatherIcon: null,
    weatherCondition: null,
  });

  useEffect(() => {
    const visualCrossingApiKey = 'SX8VRLTAM39QMEFH4STA9A5T6';
    const weatherToIconMap = new Map([
      ['Clear', require('../../images/sun.png')],
      ['Partially cloudy', require('../../images/partlyCloudy.png')],
      ['Rain', require('../../images/rainCloud.png')],
      ['Rain, Partially cloudy', require('../../images/rainCloud.png')],
      ['Overcast', require('../../images/overcast.png')]
    ]);

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?key=${visualCrossingApiKey}&include=current`)
			.then((response) => response.json())
			.then((data) => {
				setCityData({
          name: city,
          weatherIcon: weatherToIconMap.get(data.currentConditions.conditions),
          weatherCondition: data.currentConditions.conditions
        });
			})
			.catch((error) => {
				console.error(error);
			});
  }, [city]);

	return (
    <Card
      style={{
        width: '100%',
        height: '40px',
      }}
    >
      <Card.Body
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0',
          width: '100%'
        }}
      >
        <Card.Img 
          src={cityData.weatherIcon}
          alt=""
          style={{
            position: 'absolute',
            left: '0',
            margin: '5px',
            width: '25px',
            height: 'auto',
          }}
        />
        <Card.Text
          style={{
            position: 'absolute',
            left: '40px',
            margin: '5px',
            width: '100px',
            height: 'auto',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          {cityData.name}
        </Card.Text>
        <Card.Text
          style={{
            position: 'absolute',
            right: '0',
            margin: '5px',
            width: '90px',
            height: 'auto',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          {cityData.weatherCondition}
        </Card.Text>
      </Card.Body>
    </Card>
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
				setNearbyCities(data.data);
			})
			.catch((error) => {
				console.log(error);
			})
		}, [location]);

	return (
		<Card
			style={{
        position: "absolute",
        top: '20px',
        right: '0',
				padding: '10px',
				width: '300px',
				height: 'auto',
			}}
		>
			<Card.Title>
				Nearby Cities
			</Card.Title>
			<Card.Body>
        {nearbyCities && nearbyCities.map((city) => {
          return (
            <CityCard
              city={`${city.name}, ${city.regionCode}`}
            />
          );
        })}
      </Card.Body>
		</Card>
	);
}

export default NearbyLocations;