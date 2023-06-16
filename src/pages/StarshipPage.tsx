import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Search_Starship } from '../types'
import IdPage from '../components/IdPage'

const StarshipPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Search_Starship | null>(null)

	const { id } = useParams();

	const getData = async (id : number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Search_Starship>("starships", id)
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
				<IdPage data={data} resource='starships'>
					<section>
						<div className='body'>
							<ul>
								<li>Model: <span className='text-capitalize'>{data.model}</span></li>
								<li>Starship class: <span className='text-capitalize'>{data.starship_class}</span></li>
								<li>Manufacturer: {data.manufacturer}</li>
								<li>Crew: {data.crew}</li>
								<li>Passengers: {data.passengers}</li>
								<li>Hyperdrive rating: {data.hyperdrive_rating}</li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default StarshipPage
