import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Species_Single_Search } from '../types'
import IdPage from '../components/IdPage'

const Species_SinglePage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Species_Single_Search | null>(null)

	const { id } = useParams();

	const getData = async (id : number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Species_Single_Search>("species", id)
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
								{data.homeworld !== null &&<li>Homeworld:  <Link to={`/planets/${data.homeworld.id}`}>{data.homeworld.name}</Link></li>}
								<li>Classification: <span className='text-capitalize'>{data.classification}</span></li>
								<li>Designation: <span className='text-capitalize'>{data.designation}</span></li>
								<li>Language: {data.language}</li>
								<li>Average lifespan: <span className='text-capitalize'>{data.average_lifespan}</span> years</li>
								<li>Skin colors: <span className='text-capitalize'>{data.skin_colors}</span></li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default Species_SinglePage
