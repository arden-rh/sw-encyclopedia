import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'
import { SWAPI_Films, SWAPI_People, SWAPI_Planets, SWAPI_Species, SWAPI_Starships, SWAPI_Vehicles } from '../types'

interface IProps {
	children: React.ReactNode
	data: SWAPI_Films | SWAPI_People | SWAPI_Planets | SWAPI_Species | SWAPI_Starships | SWAPI_Vehicles
	navigateToPage: () => void
	resource: string
}

const CardComponent: React.FC<IProps> = ({ children, data, navigateToPage, resource }) => {

	return (
		<>
			{data ?
				<Card
					style={{ width: '20rem' }}
				>
					<Card.Body>
						{('episode_id' in data) && <>
							<Card.Title>{data.title}</Card.Title>
							{children}
							<ListGroup className="list-group-flush">
								<ListGroup.Item>Characters: {data.characters_count}</ListGroup.Item>
								<ListGroup.Item>Starships: {data.starships_count}</ListGroup.Item>
								<ListGroup.Item>Planets: {data.planets_count}</ListGroup.Item>
							</ListGroup>
						</>
						}
						{('name' in data) && <>
						<Card.Title>{data.name}</Card.Title>
						{children}
							<ListGroup className="list-group-flush">
								<ListGroup.Item>Films: {data.films_count}</ListGroup.Item>
								{('starships_count' in data) && data.starships_count > 0 && <ListGroup.Item>Starships: {data.starships_count}</ListGroup.Item>}
								{('vehicles_count' in data) && data.vehicles_count > 0 && <ListGroup.Item>Vehicles: {data.vehicles_count}</ListGroup.Item>}
								{('residents_count' in data) && data.residents_count > 0 && <ListGroup.Item>Residents: {data.residents_count}</ListGroup.Item>}
								{('pilots_count' in data) && data.pilots_count > 0 && <ListGroup.Item>Pilots: {data.pilots_count}</ListGroup.Item>}
								{('people_count' in data) && data.people_count > 0 && <ListGroup.Item>People: {data.people_count}</ListGroup.Item>}
							</ListGroup>
						</>}
					</Card.Body>
					<Card.Body>
						<Card.Link
							as={Link}
							to={`/${resource}/${data.id}`}
							onClick={navigateToPage}
						>
							<Button>Read more</Button>
						</Card.Link>
					</Card.Body>
				</Card> : <p>Something went wrong</p>}
		</>
	)
}

export default CardComponent
