import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Search_Single_Species } from '../types'
import IdPage from '../components/IdPage'

const Species_SinglePage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Search_Single_Species | null>(null)

	const { id } = useParams()

	const getData = async (id: number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Search_Single_Species>("species", id)
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
				<IdPage data={data} resource='species'>
					<section>
						<div className='body'>
							<ul>
								{data.homeworld !== null && <li><span className='info-category'>Homeworld:</span>  <Link to={`/planets/${data.homeworld.id}`}>{data.homeworld.name}</Link></li>}
								<li><span className='info-category'>Classification:</span> <span className='text-capitalize'>{data.classification}</span></li>
								<li><span className='info-category'>Designation:</span> <span className='text-capitalize'>{data.designation}</span></li>
								<li><span className='info-category'>Language:</span> {data.language}</li>
								<li><span className='info-category'>Average lifespan:</span> <span className='text-capitalize'>{data.average_lifespan}</span> years</li>
								<li><span className='info-category'>Skin colors:</span> <span className='text-capitalize'>{data.skin_colors}</span></li>
							</ul>
						</div>
					</section>
				</IdPage>}
		</>
	)
}

export default Species_SinglePage
