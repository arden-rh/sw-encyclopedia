/**
 * Star Wars API (the hive resistance)
 */

import axios from "axios";

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://swapi.thehiveresistance.com/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

/**
 * Generic GET request
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)
	return response.data as T
}

/**
 * Search requests
 */

export const getById = <T = any>(resource: string, id: number) => {
	return get<T>(`/${resource}/${id}`)
}

export const getMulti = <T = any>(resource: string) => {
	return get<T>(`/${resource}`)
}

export const getPage = <T = any>(resource: string, page: number) => {
	return get<T>(`${resource}/?page=${page}`)
}

export const searchResource = <T = any>(resource: string, query: string, page: number) => {
	return get<T>(`${resource}/?search=${query}&page=${page}`)
}

export const getNewPageData = async <T = any>(html: string) => {
	return axios.get<T>(`${html}`)
}

