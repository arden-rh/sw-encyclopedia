import { faAnglesLeft, faEarthEurope, faFilm, faPerson, faPersonRays, faRocket, faTruckPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { SWAPI_Search_Film, SWAPI_Search_Person, SWAPI_Search_Planet, SWAPI_Search_Single_Species, SWAPI_Search_Starship, SWAPI_Search_Vehicle } from '../types'
import Button from 'react-bootstrap/Button';
import CategoryCompFilm from './CategoryCompFilm'
import CategoryComponent from './CategoryComponent'

interface IProps {
	data: SWAPI_Search_Film | SWAPI_Search_Person | SWAPI_Search_Planet | SWAPI_Search_Single_Species | SWAPI_Search_Starship | SWAPI_Search_Vehicle
	children: React.ReactNode
	resource: string
}

const IdPage: React.FC<IProps> = ({ data, children, resource }) => {

	const convertToRoman = (num: number) => {
		if (num === 1) { return "I" }
		if (num === 2) { return "II" }
		if (num === 3) { return "III" }
		if (num === 4) { return "IV" }
		if (num === 5) { return "V" }
		if (num === 6) { return "VI" }
	}

	const navigate = useNavigate()

	return (
		<>
			{data &&
				<div className='info-container'>
					{('title' in data) && <h1><span>Episode {convertToRoman(Number(data.episode_id))}:</span><span>{data.title}</span></h1>}
					{('name' in data) && <h1><span className='name'>{data.name}</span></h1>}
					{children}
					<section>
						{'characters' in data &&
							<CategoryComponent
								resource='characters'
								icon={faPersonRays}
								data={data.characters}
							/>
						}

						{'residents' in data && data.residents.length > 0 &&
							<CategoryComponent
								resource='residents'
								icon={faPersonRays}
								data={data.residents}
							/>
						}

						{'people' in data && data.people.length > 0 &&
							<CategoryComponent
								resource='people'
								icon={faPersonRays}
								data={data.people}
							/>
						}

						{'pilots' in data && data.pilots.length > 0 &&
							<CategoryComponent
								resource='pilots'
								icon={faPersonRays}
								data={data.pilots}
							/>
						}

						{'films' in data && data.films.length > 0 &&
							<CategoryCompFilm
								resource='films'
								icon={faFilm}
							>
								{data.films.map(film =>
									<li>
										<Link to={`/films/${film.id}`}><span>{film.title}</span>
											<span className="material-symbols-outlined">arrow_forward_ios</span>
										</Link>
									</li>)}
							</CategoryCompFilm>
						}

						{'starships' in data && data.starships.length > 0 &&
							<CategoryComponent
								data={data.starships}
								icon={faRocket}
								resource='starships'
							/>
						}

						{'vehicles' in data && data.vehicles.length > 0 &&
							<CategoryComponent
								data={data.vehicles}
								icon={faTruckPlane}
								resource='vehicles'
							/>
						}

						{'species' in data && data.species.length > 0 &&
							<CategoryComponent
								data={data.species}
								icon={faPerson}
								resource='species'
							/>
						}

						{'planets' in data && data.planets.length > 0 &&
							<CategoryComponent
								data={data.planets}
								icon={faEarthEurope}
								resource='planets'
							/>
						}

					</section>
					<Link
						className='go-back'
						to={`/${resource}`}
						onClick={(e) => {
							e.preventDefault();
							navigate(`/${resource}`);
						}}>
						<Button><FontAwesomeIcon icon={faAnglesLeft} /></Button>
					</Link>
				</div>
			}
		</>
	)
}

export default IdPage
