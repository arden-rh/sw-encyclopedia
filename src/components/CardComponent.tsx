import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'
import { SWAPI_Films, SWAPI_People, SWAPI_Planets, SWAPI_SpeciesM, SWAPI_Starships, SWAPI_Vehicles } from '../types'

interface IProps {
	data: SWAPI_Films | SWAPI_People | SWAPI_Planets | SWAPI_SpeciesM | SWAPI_Starships | SWAPI_Vehicles
	navigateToPage: () => void
}

const CardComponent: React.FC<IProps> = ({ data, navigateToPage }) => {

	const convertToRoman = (num: number) => {
		if (num === 1) { return "I" }
		if (num === 2) { return "II" }
		if (num === 3) { return "III" }
		if (num === 4) { return "IV" }
		if (num === 5) { return "V" }
		if (num === 6) { return "VI" }
	}

	return (
		<>
			{data ?
				<Card
					bg='dark'
					style={{ width: '20rem' }}
					text='white'
				>
					<Card.Body>
						{('episode_id' in data) && <>
							<Card.Title>Episode: {convertToRoman(Number(data.episode_id))}: {data.title}</Card.Title>
							<Card.Text>
								{data.opening_crawl}
							</Card.Text>
						</>
						}
						{('name' in data) && <Card.Title>{data.name}</Card.Title>}


					</Card.Body>
					{('director' in data) && <>
						<ListGroup className="list-group-flush">
							<ListGroup.Item variant='dark'>Director: {data.director}</ListGroup.Item>
							<ListGroup.Item>Released: </ListGroup.Item>
							<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#">Another Link</Card.Link>
							<Card.Link
								as={Link}
								to={`/films/${data.id}`}
								onClick={navigateToPage}
							>
								<Button variant='secondary'>Read more</Button>
							</Card.Link>
						</Card.Body>
					</>}
				</Card> : <p>Something went wrong</p>}
		</>
	)
}

export default CardComponent
