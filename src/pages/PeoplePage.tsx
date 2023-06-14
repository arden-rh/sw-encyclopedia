import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
// import useGetData from '../hooks/useGetData'
import { SWAPI_People, SWAPI_Search_People } from '../types'
import { getMulti } from '../services/SWAPI'
import Pagination from '../components/Pagination'
import CardComponent from '../components/CardComponent'


const PeoplePage = () => {

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [data, setData] = useState<SWAPI_People[] | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchResult, setSearchResult] = useState<SWAPI_Search_People | null>(null)

	const getPeople = async () => {

		setError(null)
		setLoading(true)
		setData(null)

		try {
			const result = await getMulti<SWAPI_Search_People>("people")
			setData(result.data)
			setSearchResult(result)
			setPage(result.current_page)

		} catch (e: any) {
			setError(e.message)
		}

		setLoading(false)

	}

	const goToPage = (url: string) => {

	}

	useEffect(() => {
		getPeople()

	}, [])

	return (
		<>
			<h1>People Page</h1>

			<div className='d-flex flex-column align-items-center gap-4'>
				{data &&
					data.map(item =>
						<CardComponent
							people={item}
						/>)
				}
			</div>
			{searchResult && <Pagination
				page={page}
				totalPages={searchResult.last_page}
			// onNextPage={}
			// onPrevPage={}
			/>}
		</>
	)
}

export default PeoplePage
