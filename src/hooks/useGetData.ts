import { useEffect, useState } from 'react'
import axios from 'axios'

const useGetData = <T = any>(initialUrl: string | null = null) => {

	const [data, setData] = useState<T | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [url, setUrl] = useState(initialUrl)

	const changeUrl = (_url: string) => {

		try {
			const url = new URL(_url)
			setUrl(url.toString())

		} catch (e: any) {
			setError("Not a valid URL")
			setIsError(true)

		}
		setData(null)
	}

	const execute = () => {

		if (!url) {
			return
		}
		getData(url)
	}

	const getData = async (url: string) => {

		setData(null)
		setError(null)
		setIsError(false)
		setIsLoading(true)

		try {
			const res = await axios.get<T>(url)
			setData(res.data)

		} catch (e: any) {
			setError(e.message)
			setIsError(true)
		}

		setIsLoading(false)

	}

	useEffect(() => {

		if (!url) {
			return
		}
		getData(url)
	}, [url])


	return {
		data,
		error,
		isError,
		isLoading,
		changeUrl,
		execute
	}
}

export default useGetData
