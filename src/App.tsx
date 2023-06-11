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

const App = () => {
	return (
		<div id='App'>
			<Navigation />
			<Container className='py-3'>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/films" element={<FilmsPage />} />
					<Route path="/people" element={<PeoplePage />} />
					<Route path="/planets" element={<PlanetsPage />} />
					<Route path="/species" element={<SpeciesPage />} />
					<Route path="/starships" element={<StarshipsPage />} />
					<Route path="/vechicles" element={<VehiclesPage />} />
					<Route path="*" element={<NotFound />} />

				</Routes>
			</Container>
		</div>
	)
}

export default App
