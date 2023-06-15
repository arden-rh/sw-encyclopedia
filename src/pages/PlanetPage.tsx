import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Planet_Search } from '../types'
import IdPage from '../components/IdPage'

const PlanetPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Planet_Search | null>(null)

	const { id } = useParams();

	const getData = async (id : number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Planet_Search>("planets", id)
			setData(result)
		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)
	}

	useEffect(() => {

		if (!id) {
			return
		}

		getData(Number(id))

	}, [id])


	return (
		<>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{!error && data &&
				<IdPage data={data}>
					<section>
						<div className='body'>
							<ul>
								<li>Climate: <span className='text-capitalize'>{data.climate}</span></li>
								<li>Diameter: {data.diameter} km</li>
								<li>Orbital period: {data.orbital_period} standard days</li>
								<li>Rotation period: {data.rotation_period} standard hours</li>
								<li>Population: <span className='text-capitalize'>{data.population}</span></li>
								<li>Terrain: <span className='text-capitalize'>{data.terrain}</span></li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default PlanetPage
