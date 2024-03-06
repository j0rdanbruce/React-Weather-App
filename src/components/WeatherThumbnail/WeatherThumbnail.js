import Card from 'react-bootstrap/Card';


/**
 * The main component that displays the weather thumbnail based on the weather condition value passed as a prop.
 */


const WeatherThumbnail = ({weatherCondition}) => {
	const weatherToIconMap = new Map([
		['Clear', require('../../images/sun.png')],
		['Partially cloudy', require('../../images/partlyCloudy.png')],
		['Rain', require('../../images/rainCloud.png')],
		['Rain, Partially cloudy', require('../../images/rainCloud.png')],
		['Rain, Overcast', require('../../images/rainCloud.png')],
		['Overcast', require('../../images/overcast.png')]
	]);
  return (
		<Card.Img
			src={weatherToIconMap.get(weatherCondition)}
			alt='Not found.'
			style={{
				width: '25px'
			}}
		>
		</Card.Img>
  );
}

export default WeatherThumbnail;