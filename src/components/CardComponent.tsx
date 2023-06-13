import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface IProps {
	director: string
	episode_id: string
	text: string
	title: string

}

const CardComponent: React.FC<IProps> = ({ director, episode_id, text, title }) => {


	const convertToRoman = (num: number) => {
		if(num === 1) {return "I"}
		if(num === 2) {return "II"}
		if(num === 3) {return "III"}
		if(num === 4) {return "IV"}
		if(num === 5) {return "V"}
		if(num === 6) {return "VI"}
	}

	return (
		<Card
			bg='dark'
			style={{ width: '20rem' }}
			text='white'
		>
			<Card.Body>
				<Card.Title>Episode: {convertToRoman(Number(episode_id))}: {title}</Card.Title>
				<Card.Text>
					{text}
				</Card.Text>
			</Card.Body>
			<ListGroup className="list-group-flush">
				<ListGroup.Item variant='dark'>Director: {director}</ListGroup.Item>
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
