import Card from "react-bootstrap/Card";

const WeatherGraph = ({className, location}) => {

	return (
		<Card className={className}>
			<Card.Body>
				Weather Graph
			</Card.Body>
		</Card>
	);
}

export default WeatherGraph;