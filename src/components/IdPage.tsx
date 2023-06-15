import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'
import { SWAPI_Film_Search, SWAPI_Person_Search, SWAPI_Planet_Search, SWAPI_Species_Search, SWAPI_Starship_Search, SWAPI_Vehicle_Search } from '../types'

interface IProps {
	data: SWAPI_Film_Search | SWAPI_Person_Search | SWAPI_Planet_Search | SWAPI_Species_Search | SWAPI_Starship_Search | SWAPI_Vehicle_Search
}

const IdPage: React.FC<IProps> = ({ data }) => {


	return (
		<>
			{data &&
				<div className='info-container'>
					{('title' in data) && <h1>{data.title}</h1>}


				</div>
			}

		</>
	)
}

export default IdPage
