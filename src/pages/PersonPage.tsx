import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Search_Person } from '../types'
import IdPage from '../components/IdPage'

const PersonPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Search_Person | null>(null)

	const { id } = useParams()

	const getData = async (id: number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Search_Person>("people", id)
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
				<IdPage data={data} resource='people'>
					<section>
						<div className='body'>
							<ul>
								<li><span className='info-category'>Birth year:</span> {data.birth_year}</li>
								<li><span className='info-category'>Homeworld:</span> <Link to={`/planets/${data.homeworld.id}`}>{data.homeworld.name}</Link></li>
								<li><span className='info-category'>Eye color:</span> <span className='text-capitalize'>{data.eye_color}</span></li>
								<li><span className='info-category'>Hair color:</span> <span className='text-capitalize'>{data.hair_color}</span></li>
								<li><span className='info-category'>Height:</span> {data.height} cm</li>
								<li><span className='info-category'>Mass:</span> {data.mass} kg</li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default PersonPage
