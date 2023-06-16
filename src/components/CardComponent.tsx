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
							<ListGroup className="list-group-flush">
								{children}
								<ListGroup.Item><span className='info-category'>Characters:</span> {data.characters_count}</ListGroup.Item>
								<ListGroup.Item><span className='info-category'>Starships:</span> {data.starships_count}</ListGroup.Item>
								<ListGroup.Item><span className='info-category'>Planets:</span> {data.planets_count}</ListGroup.Item>
							</ListGroup>
						</>
						}
						{('name' in data) && <>
							<Card.Title>{data.name}</Card.Title>
							<ListGroup className="list-group-flush">
								{children}
								{('films_count' in data) && data.films_count > 0 && <ListGroup.Item><span className='info-category'>Films:</span> {data.films_count}</ListGroup.Item>}
								{('starships_count' in data) && data.starships_count > 0 && <ListGroup.Item><span className='info-category'>Starships:</span> {data.starships_count}</ListGroup.Item>}
								{('vehicles_count' in data) && data.vehicles_count > 0 && <ListGroup.Item><span className='info-category'>Vehicles:</span> {data.vehicles_count}</ListGroup.Item>}
								{('residents_count' in data) && data.residents_count > 0 && <ListGroup.Item><span className='info-category'>Residents:</span> {data.residents_count}</ListGroup.Item>}
								{('pilots_count' in data) && data.pilots_count > 0 && <ListGroup.Item><span className='info-category'>Pilots:</span> {data.pilots_count}</ListGroup.Item>}
								{('people_count' in data) && data.people_count > 0 && <ListGroup.Item><span className='info-category'>People:</span> {data.people_count}</ListGroup.Item>}
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
