import axiosInstance from "./interceptor";

/**
 * Fetch all countries.
 *
 * @async
 * @returns {Promise<any>} Returns the data of the response with all countries.
 */
export async function getCountries(): Promise<any> {
    return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getAllCountries`).then((response) => {
        return(response.data);
    });
}

/**
 * Fetch countries by continent.
 *
 * @async
 * @param {string} continent - The continent to filter countries by.
 * @returns {Promise<any>} Returns the data of the response with countries from the specified continent.
 */
export async function getCountriesByContinent(continent: string): Promise<any> {
    return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getContinent/${continent}`).then((response) => {
        return(response.data);
    });
}

/**
 * Search for a country.
 *
 * @async
 * @param {string} query - The query to search countries by.
 * @returns {Promise<any>} Returns the data of the response with the search results.
 */
export async function searchCountry(query: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/searchCountry/${query}`).then((response) => {
            return response.data
	});
}

/**
 * Fetch liked countries by user ID.
 *
 * @async
 * @param {string} id - The user ID.
 * @returns {Promise<any>} Returns the data of the response with the liked countries.
 */
export async function getLikedCountries(id: string): Promise<any> {
    if(!id){
		return;
	}
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getLikedCountries/${id}`).then((response) => {
		return response.data;
	});
}

/**
 * Fetch country by name.
 *
 * @async
 * @param {string} name - The name of the country.
 * @returns {Promise<any>} Returns the data of the response with the country.
 * @throws {Error} Logs error if the request fails.
 */
export async function getCountryByName(name: string): Promise<any> {
    try {
        return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getCountryByName${name}`).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.log('error : ', error)
    }
}

/**
 * Like a country.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {any} liked - The country object to like.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function likeCountry(id: string, liked: any): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/likeCountry`, {
        userId: id,
        liked : liked
    }).then((response) => {
		return response;
	});
}

/**
 * Mark a country as visited.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {any} visited - The country object to mark as visited.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function visitCountry(id: string, visited: any): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/visitCountry`, {
        userId: id,
        visited : visited
    }).then((response) => {
		return response;
	});
}

/**
 * Fetch visited countries by user ID.
 *
 * @async
 * @param {string} id - The user ID.
 * @returns {Promise<any>} Returns the data of the response with the visited countries.
 */
export async function getVisitedCountries(id: string): Promise<any> {
    if(!id){
		return;
	}
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getVisitedCountries${id}`).then((response) => {
		return response.data;
	});
}