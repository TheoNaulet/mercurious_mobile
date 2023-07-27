import axiosInstance from "./interceptor";

/**
 * Fetch all cities with pagination.
 *
 * @async
 * @param {number} page - The page number to return.
 * @returns {Promise<any>} Returns the data of the response with all cities.
 */
export async function getAllCities(page: number = 1): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/city/getAllCities`, {
        params: {
            page: page,
        },
    }).then((response) => {
		return response.data;
	});
}


/**
 * Fetch cities by country.
 *
 * @async
 * @param {string} country - The country to filter cities by.
 * @returns {Promise<any>} Returns the data of the response with cities from the specified country.
 */
export async function getCitiesByCountry(country: string, followings: Array<string>, page:number): Promise<any> {
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/city/getCitiesByCountry/${country}?page=${page}`, { followings: followings })
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
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/city/searchCity/${query}`).then((response) => {
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
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getLikedCitiesByCountry`, { userId: id, country: countryName })
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
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/city/getCityByName/${name}`)
		.then((response) => {
			return response.data;
		});
}

/**
 * Like a city.
 *
 * @async
 * @param {string} uid - The user ID.
 * @param {any} cityId - The city object to like.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function likeCity(uid: string, cityId: string): Promise<any> {
	try {
		return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/likeCity`, {
			userId: uid,
			cityId: cityId,
		})
		.then((response) => {
			return response;
		});
	} catch (error) {
		console.log(error);
	}
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
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/visitCity`, {
			userId: id,
			city: visit
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
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getVisitedCitiesByCountry`, { userId:id, country:countryName })
		.then((response) => {
			return response.data;
		});
}

/**
 * Fetch all cities visited by certain users with pagination.
 *
 * @async
 * @param {Array<string>} followings - The array of user IDs.
 * @param {number} page - The page number to return.
 * @returns {Promise<any>} Returns the data of the response with all visited cities and their visitor user IDs.
 */
export async function getAllCitiesTest(followings: Array<string>, page: number = 1): Promise<any> {
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/city/getAllCitiesTest?page=${page}`, { followings })
    .then((response) => {
		return response.data;
	});
}
