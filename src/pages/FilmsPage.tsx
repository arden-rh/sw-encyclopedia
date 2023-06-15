import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
// import useGetData from '../hooks/useGetData'
import { SWAPI_Films, SWAPI_Search_Films } from '../types'
import { getMulti } from '../services/SWAPI'
import Pagination from '../components/Pagination'
import CardComponent from '../components/CardComponent'
import SearchForm from '../components/SearchForm'
import { searchResource } from "../services/SWAPI"



const FilmsPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [data, setData] = useState<SWAPI_Films[] | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchResult, setSearchResult] = useState<SWAPI_Search_Films | null>(null)


	const query = searchParams.get("query")
	const paramsPage = searchParams.get("page")

	const getFilms = async () => {

		setError(null)
		setLoading(true)
		setData(null)
		setSearchResult(null)

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

	const formSubmit = async (query: string, page: number) => {

		setData(null)
		setError(null)
		setLoading(true)
		setSearchResult(null)

		setSearchParams({ query: query, page: page.toString() })

		try {
			const result = await searchResource<SWAPI_Search_Films>("films", query, page)
			setData(result.data)
			setSearchResult(result)

			if (result.data.length === 0) {
				setLoading(false)
				throw new Error(`No result could be found for ${query}`)
			}

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)

	}

	useEffect(() => {

		if (!query) {
			getFilms()
			return
		}

		formSubmit(query, page)

	}, [query, page])

	return (
		<>
			<h1>Films Page</h1>

			<SearchForm
				onFormSubmit={formSubmit}
				page={page}
			/>

			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{!error && query && searchResult && <p>Showing {searchResult.total} search {searchResult.data.length === 1 ? 'result' : 'results'} for "{query}"...</p>}


			<div className='d-flex flex-column align-items-center gap-4'>
				{!error && data &&
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
