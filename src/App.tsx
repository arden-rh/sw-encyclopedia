import Container from 'react-bootstrap/Container'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'

/** Resource pages */
import FilmsPage from './pages/FilmsPage'
import PeoplePage from './pages/PeoplePage'
import PlanetsPage from './pages/PlanetsPage'
import SpeciesPage from './pages/SpeciesPage'
import StarshipsPage from './pages/StarshipsPage'
import VehiclesPage from './pages/VehiclesPage'

/** Individual pages */
import FilmPage from './pages/FilmPage'
import PersonPage from './pages/PersonPage'
import StarshipPage from './pages/StarshipPage'


const App = () => {
	return (
		<div id='App'>
			<Navigation />
			<Container className='py-3'>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/films">
						<Route path="" element={<FilmsPage />} />
						<Route path=":id" element={<FilmPage />} />
					</Route>
					<Route path="/people">
						<Route path="" element={<PeoplePage />} />
						<Route path=":id" element={<PersonPage />} />
					</Route>
					<Route path="/planets">
						<Route path="" element={<PlanetsPage />} />
						<Route path=":id" element={<PlanetsPage />} />
					</Route>
					<Route path="/species">
						<Route path="/species" element={<SpeciesPage />} />
						<Route path=":id" element={<SpeciesPage />} />
					</Route>
					<Route path="/starships">
						<Route path="" element={<StarshipsPage />} />
						<Route path=":id" element={<StarshipPage />} />
					</Route>
					<Route path="vehicles">
						<Route path="" element={<VehiclesPage />} />
						<Route path=":id" element={<VehiclesPage />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
