import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Person_Search } from '../types'
import IdPage from '../components/IdPage'

const PersonPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Person_Search | null>(null)

	const { id } = useParams();

	const getData = async (id : number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Person_Search>("people", id)
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
								<li>Birth year: {data.birth_year}</li>
								<li>Homeworld: <Link to={`/planets/${data.homeworld.id}`}>{data.homeworld.name}</Link></li>
								<li>Eye color: <span className='text-capitalize'>{data.eye_color}</span></li>
								<li>Hair color: <span className='text-capitalize'>{data.hair_color}</span></li>
								<li>Height: {data.height} cm</li>
								<li>Mass: {data.mass} kg</li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default PersonPage
