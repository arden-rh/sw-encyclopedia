import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getById } from "../services/SWAPI"
import { SWAPI_Film_Search } from '../types'
import IdPage from '../components/IdPage'

const FilmPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_Film_Search | null>(null)

	const { id } = useParams();

	const getData = async (id : number) => {

		setData(null)
		setError(null)
		setLoading(true)

		try {
			const result = await getById<SWAPI_Film_Search>("films", id)
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

			{!error && data && <IdPage data={data} />}

		</>
	)
}

export default FilmPage
