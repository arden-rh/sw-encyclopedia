import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Alert } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { search, searchPage } from "../services/SWAPI"
import { SWAPI_Films, SWAPI_Search_Films } from "../types"

interface IProps {
	error: string
	onGetFilmsSearch: (data: SWAPI_Films[]) => void
	page: number
	resource: string
}

const SearchForm : React.FC<IProps> = ({page, onGetFilmsSearch, resource}) => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState("")
	const [searchResult, setSearchResult] = useState<any | null>()
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get("query")
	const paramsPage = searchParams.get("page")

	const handleSubmit = (e: React.FormEvent) => {

		e.preventDefault()

		if (!searchInput.trim().length) {
			return
		}

		// set input value as query in search params
		setSearchParams({ query: searchInput, page: page.toString()})
		searchResourcePage(searchInput, page)

		onGetFilmsSearch(searchResult)
	}

	const searchResourcePage = async (query : string, pageToShow: number) => {

		setSearchResult(null)

		try {
			const result = await search<SWAPI_Search_Films>(resource, query)
			setSearchResult(result.data)

		} catch (e: any) {
			setError(e.message)
		}

	}

	useEffect(() => {

		if (!query) {
			return
		}

		searchResourcePage(query, page)
		setSearchInput("")

	}, [query, page])


	return (
		<Form className="mb-4" onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="searchQuery">
				<Form.Label>Search Query</Form.Label>
				<Form.Control
					autoFocus
					onChange={e => setSearchInput(e.target.value)}
					placeholder="Enter your search here..."
					required
					type="text"
					value={searchInput}
				/>
			</Form.Group>
			<div className="d-flex justify-content-end">
				<Button
					disabled={!searchInput.trim().length}
					type="submit"
					variant="success"
				>Search</Button>
			</div>
		</Form>
	)
}

export default SearchForm
