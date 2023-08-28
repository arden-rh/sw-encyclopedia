import { faAnglesLeft, faEarthEurope, faFilm, faPerson, faPersonRays, faRocket, faTruckPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { SWAPI_Search_Film, SWAPI_Search_Person, SWAPI_Search_Planet, SWAPI_Search_Single_Species, SWAPI_Search_Starship, SWAPI_Search_Vehicle } from '../types'
import Button from 'react-bootstrap/Button';
import CategoryComponent from './CategoryComponent'
import CategoryCompPeople from './CategoryCompPeople'

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
							<CategoryCompPeople
								resource='characters'
								icon={faPersonRays}
								data={data.characters}
							/>
						}

						{'residents' in data && data.residents.length > 0 &&
							<CategoryCompPeople
								resource='residents'
								icon={faPersonRays}
								data={data.residents}
							/>
						}

						{'residents' in data && data.residents.length > 0 &&
							<CategoryComponent
								resource='residents'
								icon={faPersonRays}
							>
								{data.residents.map(person =>
									<li>
										<Link to={`/people/${person.id}`}><span>{person.name}</span>
											<span className="material-symbols-outlined">arrow_forward_ios</span>
										</Link>
									</li>)}
							</CategoryComponent>
						}

						{'people' in data && data.people.length > 0 &&
							<CategoryCompPeople
								resource='people'
								icon={faPersonRays}
								data={data.people}
							/>
						}

						{'pilots' in data && data.pilots.length > 0 &&
							<CategoryCompPeople
								resource='pilots'
								icon={faPersonRays}
								data={data.pilots}
							/>
						}

						{('films' in data) && data.films.length > 0 &&
							<div>
								<h2><Link to={`/films`}>Films <FontAwesomeIcon icon={faFilm} /></Link></h2>
								<ul className='links'>
									{data.films.map(film =>
										<li>
											<Link to={`/films/${film.id}`}><span>{film.title}</span>
												<span className="material-symbols-outlined">arrow_forward_ios</span>
											</Link>
										</li>)}
								</ul>
							</div>}
						{('starships' in data) && data.starships.length > 0 &&
							<div>
								<h2><Link to={`/starships`}>Starships <FontAwesomeIcon icon={faRocket} /></Link></h2>
								<ul className='links'>
									{data.starships.map(starship =>
										<li>
											<Link to={`/starships/${starship.id}`}><span>{starship.name}</span>
												<span className="material-symbols-outlined">arrow_forward_ios</span>
											</Link>
										</li>)}
								</ul>
							</div>}
						{('vehicles' in data) && data.vehicles.length > 0 &&
							<div>
								<h2><Link to={`/vehicles`}>Vehicles <FontAwesomeIcon icon={faTruckPlane} /></Link></h2>
								<ul className='links'>
									{data.vehicles.map(vehicle =>
										<li>
											<Link to={`/vehicles/${vehicle.id}`}><span>{vehicle.name}</span>
												<span className="material-symbols-outlined">arrow_forward_ios</span>
											</Link>
										</li>)}
								</ul>
							</div>}
						{('species' in data) && data.species.length > 0 &&
							<div>
								<h2><Link to={`/species`}>Species <FontAwesomeIcon icon={faPerson} /></Link></h2>
								<ul className='links'>
									{data.species.map(species =>
										<li>
											<Link to={`/species/${species.id}`}><span>{species.name}</span>
												<span className="material-symbols-outlined">arrow_forward_ios</span>
											</Link>
										</li>)}
								</ul>
							</div>}
						{('planets' in data) &&
							<div>
								<h2><Link to={`/planets`}>Planets <FontAwesomeIcon icon={faEarthEurope} /></Link></h2>
								<ul className='links'>
									{data.planets.map(planet =>
										<li>
											<Link to={`/planets/${planet.id}`}><span>{planet.name}</span>
												<span className="material-symbols-outlined">arrow_forward_ios</span>
											</Link>
										</li>)}
								</ul>
							</div>}
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
