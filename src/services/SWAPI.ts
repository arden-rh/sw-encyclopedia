/**
 * Star Wars API (the hive resistance)
 */

import axios from "axios";
import { SWAPI_Search, SWAPI_Search_Multi } from "../types";

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

export const getById = async (resource: string, id: number) => {
	return get<SWAPI_Search>(`/${resource}/${id}`)
}

export const getMulti = async (resource: string) => {
	return get<SWAPI_Search_Multi>(`/${resource}`)
}

export const getPage = async (page: number) => {
	return get<SWAPI_Search_Multi>(`/?page=${page}`)
}

export const search = async (query: string) => {
	return get<SWAPI_Search_Multi>(`/?search=${query}`)
}

export const searchPage = async (query: string, page: number) => {
	return get<SWAPI_Search_Multi>(`/?search=${query}&page=${page}`)
}

