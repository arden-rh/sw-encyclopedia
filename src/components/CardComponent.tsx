import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { SWAPI_Films, SWAPI_People, SWAPI_Planets } from '../types';

interface IProps {
	films?: SWAPI_Films
	people?: SWAPI_People
	planets?: SWAPI_Planets
}

const CardComponent: React.FC<IProps> = ({ films, people, planets }) => {

	const convertToRoman = (num: number) => {
		if (num === 1) { return "I" }
		if (num === 2) { return "II" }
		if (num === 3) { return "III" }
		if (num === 4) { return "IV" }
		if (num === 5) { return "V" }
		if (num === 6) { return "VI" }
	}

	return (
		<Card
			bg='dark'
			style={{ width: '20rem' }}
			text='white'
		>
			<Card.Body>
				{films && <>
					<Card.Title>Episode: {convertToRoman(Number(films.episode_id))}: {films.title}</Card.Title>
					<Card.Text>
						{films.opening_crawl}
					</Card.Text>
				</>
				}
				{people && <Card.Title>{people.name}</Card.Title>}
				{planets && <Card.Title>{planets.name}</Card.Title>}

			</Card.Body>
			<ListGroup className="list-group-flush">
				<ListGroup.Item variant='dark'>Director: {films?.director}</ListGroup.Item>
				<ListGroup.Item>Released: </ListGroup.Item>
				<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
			</ListGroup>
			<Card.Body>
				<Card.Link href="#">Card Link</Card.Link>
				<Card.Link href="#">Another Link</Card.Link>

			</Card.Body>
		</Card>
	)
}

export default CardComponent
