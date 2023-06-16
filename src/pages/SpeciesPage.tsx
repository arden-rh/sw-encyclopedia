import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getNewPageData, searchResource } from "../services/SWAPI"
import { SWAPI_Species, SWAPI_Search_Species } from '../types'
// import useGetData from '../hooks/useGetData'
import ListGroup from 'react-bootstrap/ListGroup'

/** Components */
import CardComponent from '../components/CardComponent'
import Pagination from '../components/Pagination'
import SearchForm from '../components/SearchForm'


const SpeciesPage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [data, setData] = useState<SWAPI_Species[] | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchResult, setSearchResult] = useState<SWAPI_Search_Species | null>(null)

	const navigate = useNavigate()

	const query = searchParams.get("query")
	const paramsPage = searchParams.get("page")

	const changePage = async (next: boolean) => {

		setError(null)
		setLoading(true)
		setData(null)


		const nextPageValue = next ? page + 1 : page - 1


		if (!searchResult || searchResult.next_page_url === null) {
			setLoading(false)

			if (query) {
				getData(query, nextPageValue)
			} else {
				getData("", nextPageValue)
			}
			return
		}


		try {
			const result = await getNewPageData<SWAPI_Search_Species>(searchResult.next_page_url)
			setData(result.data)
			setSearchResult(result)
			setPage(result.current_page)

			if (query) {
				getData(query, result.current_page)
			} else {
				setSearchParams({ page: nextPageValue.toString() })
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


		try {
			const result = await searchResource<SWAPI_Search_Species>("species", query, page)
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
			<h1>Species</h1>

			<SearchForm
				onGetData={getData}
				onResetForm={resetForm}
				page={1}
			/>

			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{!error && query && searchResult && <p>Showing {searchResult.total} search {searchResult.data.length === 1 ? 'result' : 'results'} for "{query}"...</p>}

			<div className='card-container'>
				{!error && data &&
					data.map(item =>
						<CardComponent
							data={item}
							key={item.id}
							navigateToPage={() => navigate(`/films/${item.id}`)}
						>
							<ListGroup className="list-group-flush">
								<ListGroup.Item>Language: <span className='text-capitalize'>{item.language}</span></ListGroup.Item>
								{item.homeworld !== null && <ListGroup.Item>Homeworld: {item.homeworld.name}</ListGroup.Item>}
								<ListGroup.Item>Designation: <span className='text-capitalize'>{item.designation}</span></ListGroup.Item>
							</ListGroup>
						</CardComponent>
					)
				}
			</div>

			{searchResult && searchResult.last_page > 1 && <Pagination
				page={page}
				totalPages={searchResult.last_page}
				onChangePage={changePage}
			/>}
		</>
	)
}

export default SpeciesPage
