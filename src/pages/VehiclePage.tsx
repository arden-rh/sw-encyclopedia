import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Search_Vehicle } from '../types'
import IdPage from '../components/IdPage'

const VehiclePage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Search_Vehicle | null>(null)

	const { id } = useParams();

	const getData = async (id: number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Search_Vehicle>("vehicles", id)
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
				<IdPage data={data} resource='vehicles'>
					<section>
						<div className='body'>
							<ul>
								<li>Model: <span className='text-capitalize'>{data.model}</span></li>
								<li>Vehicle class: <span className='text-capitalize'>{data.vehicle_class}</span></li>
								<li>Manufacturer: {data.manufacturer}</li>
								<li>Crew: {data.crew}</li>
								<li>Passengers: {data.passengers}</li>
								<li>Max atmosphering speed: {data.max_atmosphering_speed} km/h</li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default VehiclePage
