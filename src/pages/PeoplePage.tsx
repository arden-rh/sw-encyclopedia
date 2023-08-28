import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { getNewPageData, searchResource } from "../services/SWAPI"
import { SWAPI_People, SWAPI_Search_People } from '../types'
import ListGroup from 'react-bootstrap/ListGroup'


/** Components */
import CardComponent from '../components/CardComponent'
import Pagination from '../components/Pagination'
import SearchForm from '../components/SearchForm'


const PeoplePage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<SWAPI_People[] | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get("query")
	const page = Number(searchParams.get("page"))

	const [searchResult, setSearchResult] = useState<SWAPI_Search_People | null>(null)

	const { search } = useLocation()
	const navigate = useNavigate()

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
			const result = await getNewPageData<SWAPI_Search_People>(searchResult.next_page_url)
			setData(result.data)
			setSearchResult(result)

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
			const result = await searchResource<SWAPI_Search_People>("people", query, page)
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


	const resetForm = () => {
		setSearchParams({ query: "", page: page.toString() })
		getData("", 1)
	}


	useEffect(() => {

		if (!query || query === "") {
			getData("", page || 1)

		} else {
			getData(query, page || 1)
		}

	}, [query, page])

	return (
		<>
			<h1 className='resource-headers'>Characters</h1>

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
							resource='people'
						>
							<ListGroup.Item><span className='info-category'>Birth year:</span> {item.birth_year}</ListGroup.Item>
							<ListGroup.Item><span className='info-category'>Homeworld:</span> {item.homeworld.name}</ListGroup.Item>
							<ListGroup.Item><span className='info-category'>Hair color:</span> <span className='text-capitalize'>{item.hair_color}</span></ListGroup.Item>

						</CardComponent>
					)
				}
			</div>

			{searchResult && <Pagination
				page={searchResult.current_page}
				totalPages={searchResult.last_page}
				onChangePage={changePage}
			/>}
		</>
	)
}

export default PeoplePage
