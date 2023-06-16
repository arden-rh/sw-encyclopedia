import logo from "../assets/images/swapi_logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthEurope, faFilm, faPerson, faPersonRays, faRocket, faTruckPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<>
			<div className='home-page-hero'>
				<p>Welcome to</p>
				<h1><img src={logo} alt="The Star Wars Encyclopedia" /><span className="d-none">The Star Wars Encyclopedia</span></h1>
			</div>
			<div className='home-page-list'>
				<ul>
					<li><Link to={`/films`}><span>Films</span> <FontAwesomeIcon icon={faFilm} /></Link></li>
					<li><Link to={`/people`}><span>Characters</span> <FontAwesomeIcon icon={faPersonRays} /></Link></li>
					<li><Link to={`/planets`}><span>Planets</span> <FontAwesomeIcon icon={faEarthEurope} /></Link></li>
					<li><Link to={`/species`}><span>Species</span> <FontAwesomeIcon icon={faPerson} /></Link></li>
					<li><Link to={`/starships`}><span>Starships</span> <FontAwesomeIcon icon={faRocket} /></Link></li>
					<li><Link to={`/vehicles`}><span>Vehicles</span> <FontAwesomeIcon icon={faTruckPlane} /></Link></li>
				</ul>
			</div>
			<div>
				<iframe src="https://open.spotify.com/embed/playlist/04tSf4x1ntc0pYmC3mvDrf?utm_source=generator&theme=0" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
			</div>
		</>
	)
}

export default HomePage
