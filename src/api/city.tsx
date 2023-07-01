import axiosInstance from "./interceptor";

/**
 * Fetch all cities.
 *
 * @async
 * @returns {Promise<any>} Returns the data of the response with all cities.
 */
export async function getAllCities(): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getAllCity`).then((response) => {
		return(response.data);
	});
}

/**
 * Fetch cities by country.
 *
 * @async
 * @param {string} country - The country to filter cities by.
 * @returns {Promise<any>} Returns the data of the response with cities from the specified country.
 */
export async function getCitiesByCountry(country: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getAllCities${country}`)
		.then((response) => {
			return response.data;
		});
}

/**
 * Search for a city.
 *
 * @async
 * @param {string} query - The query to search cities by.
 * @returns {Promise<any>} Returns the data of the response with the search results.
 */
export async function searchCity(query: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/searchCity/${query}`).then((response) => {
            return response.data
	});
}

/**
 * Fetch liked cities by user ID and country name.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {string} countryName - The country name.
 * @returns {Promise<any>} Returns the data of the response with the liked cities.
 */
export async function getLikedCitiesByCountry(id: string, countryName: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getLikedCitiesByCountry/${id}/${countryName}`)
		.then((response) => {
			return response.data;
		});
}

/**
 * Fetch city by name.
 *
 * @async
 * @param {string} name - The name of the city.
 * @returns {Promise<any>} Returns the data of the response with the city.
 */
export async function getCityByName(name: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getCityByName${name}`)
		.then((response) => {
			return response.data;
		});
}

/**
 * Like a city.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {any} liked - The city object to like.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function likeCity(id: string, liked: any): Promise<any> {
	return axiosInstance
		.put(`${process.env.REACT_APP_API_URL}/likeCity`, {
			userId: id,
			liked: liked,
		})
		.then((response) => {
			return response;
		});
}

/**
 * Mark a city as visited.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {any} visit - The city object to mark as visited.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function visitCity(id: string, visit: any): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/visitCity`, {
			userId: id,
			visit: visit
		}).then((response) => {
			return response;
		});
}

/**
 * Fetch visited cities by user ID and country name.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {string} countryName - The country name.
 * @returns {Promise<any>} Returns the data of the response with the visited cities.
 */
export async function getVisitedCitiesByCountry(id: string, countryName: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getVisitedCitiesByCountry/${id}/${countryName}`)
		.then((response) => {
			return response.data;
		});
}