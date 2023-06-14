import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
// import useGetData from '../hooks/useGetData'
import { SWAPI_Films, SWAPI_Search_Films } from '../types'
import { getMulti } from '../services/SWAPI'
import Pagination from '../components/Pagination'
import CardComponent from '../components/CardComponent'
import SearchForm from '../components/SearchForm'


const FilmsPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [data, setData] = useState<SWAPI_Films[] | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchResult, setSearchResult] = useState<SWAPI_Search_Films | null>(null)

	const getFilms = async () => {

		setError(null)
		setLoading(true)
		setData(null)

		try {
			const result = await getMulti<SWAPI_Search_Films>("films")
			setData(result.data)
			setSearchResult(result)
			setPage(result.current_page)

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)

	}

	const getFilmsSearch = async (data: SWAPI_Films[]) => {

		setError(null)
		setLoading(true)
		setData(null)


		try {
			await setData(data)

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)

	}

	useEffect(() => {
		getFilms()

	}, [])

	return (
		<>
			<h1>Films Page</h1>

			<SearchForm
				page={page}
				resource='films'
				onGetFilmsSearch={getFilmsSearch}

			/>

			<div className='d-flex flex-column align-items-center gap-4'>
				{data &&
					data.map(item =>
						<CardComponent
							films={item}
						/>)
				}
			</div>
			{searchResult && <Pagination
				page={page}
				totalPages={searchResult.last_page}
				// onNextPage={() => {}}
			// onPrevPage={}
			/>}
		</>
	)
}

export default FilmsPage
