import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
// import useGetData from '../hooks/useGetData'
import { SWAPI_People, SWAPI_Search_People } from '../types'
import { getNewPageData, getMulti } from '../services/SWAPI'
import Pagination from '../components/Pagination'
import CardComponent from '../components/CardComponent'
import SearchForm from '../components/SearchForm'
import { searchResource } from "../services/SWAPI"


const PeoplePage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [data, setData] = useState<SWAPI_People[] | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchResult, setSearchResult] = useState<SWAPI_Search_People | null>(null)


	const query = searchParams.get("query")
	const paramsPage = searchParams.get("page")

	const nextPage = async () => {

		setError(null)
		setLoading(true)
		setData(null)

		const nextPageValue = page + 1

		if (!searchResult || searchResult.next_page_url === null) {
			return
		}

		try {
			const result = await getNewPageData<SWAPI_Search_People>(searchResult.next_page_url)
			setData(result.data.data)
			setSearchResult(result.data)
			setPage(result.data.current_page)

			if (query) {
				getData(query, result.data.current_page)
			} else {
				setSearchParams({ page: nextPageValue.toString() })
				// getData("", nextPageValue)

			}

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)
	}

	const getPeople = async () => {

		setError(null)
		setLoading(true)
		setData(null)
		setSearchResult(null)

		try {
			// const result = await getMulti<SWAPI_Search_People>("people")
			const result = await searchResource<SWAPI_Search_People>("people", "", page)
			setData(result.data)
			setSearchResult(result)
			setPage(page)

			if (result.data.length === 0) {
				setLoading(false);
				throw new Error(`No results could be found.`);
			}

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)

	}

	const getData = async (query: string, page: number) => {

		setData(null)
		setError(null)
		setLoading(true)
		setSearchResult(null)

		setSearchParams({ query: query, page: page.toString() })
		console.log(page)

		try {
			const result = await searchResource<SWAPI_Search_People>("people", query, page)
			setData(result.data)
			setSearchResult(result)
			setPage(page)

			if (result.data.length === 0) {
				setLoading(false)
				throw new Error(`No result could be found for ${query}`)
			}

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)

	}

	const prevPage = async () => {

		setError(null)
		setLoading(true)
		setData(null)

		if (!searchResult || searchResult.prev_page_url === null) {
			return
		}

		try {
			const result = await getNewPageData<SWAPI_Search_People>(searchResult.prev_page_url)
			setData(result.data.data)
			setSearchResult(result.data)
			setPage(result.data.current_page)

			if (!query) {
				return
			}

			getData(query, result.data.current_page)

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)
	}


	const resetForm = () => {
		setSearchParams({ query: "", page: page.toString() })
		getData("", 1)
	}


	useEffect(() => {

		if (!query || query === "") {
			getData("", Number(paramsPage || "1"))
		} else {
			getData(query, Number(paramsPage || "1"))
		}

	}, [query, paramsPage])

	return (
		<>
			<h1>People Page</h1>

			<SearchForm
				onGetData={getData}
				onResetForm={resetForm}
				page={page}
			/>

			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{!error && query && searchResult && <p>Showing {searchResult.total} search {searchResult.data.length === 1 ? 'result' : 'results'} for "{query}"...</p>}


			<div className='d-flex flex-column align-items-center gap-4'>
				{!error && data &&
					data.map(item =>
						<CardComponent
							people={item}
						/>)
				}
			</div>
			{searchResult && <Pagination
				page={page}
				totalPages={searchResult.last_page}
				onNextPage={nextPage}
				onPrevPage={prevPage}
			/>}
		</>
	)
}

export default PeoplePage
