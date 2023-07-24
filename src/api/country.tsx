import axiosInstance from "./interceptor";

/**
 * Fetch all countries with pagination.
 *
 * @async
 * @param {number} page - The page number to return.
 * @returns {Promise<any>} Returns the data of the response with all countries.
 */
export async function getCountries(page: number = 1): Promise<any> {
    return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/country/getAllCountries`, {
        params: {
            page: page,
        },
    }).then((response) => {
        return response.data;
    });
}


/**
 * Fetch countries by continent.
 *
 * @async
 * @param {string} continent - The continent to filter countries by.
 * @returns {Promise<any>} Returns the data of the response with countries from the specified continent.
 */
export async function getCountriesByContinent(continent: string, followings: Array<string>): Promise<any> {
    return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/country/getCountriesByContinent/${continent}`, { followings:followings }).then((response) => {
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
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/country/searchCountry/${query}`).then((response) => {
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
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getLikedCountries`, { userId: id }).then((response) => {
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
        return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/country/getCountryByName/${name}`).then((response) => {
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
 * @param {string} uid - The user ID.
 * @param {any} countryId - The country object to like.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function likeCountry(uid: string, countryId: string): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/likeCountry`, {
        userId: uid,
        countryId : countryId
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
export async function visitCountry(id: string, visited: string): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/visitCountry`, {
        userId: id,
        country : visited
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
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getVisitedCountries`, { userId: id }).then((response) => {
		return response.data;
	});
}

/**
 * Fetch countries with their visitor user IDs.
 *
 * @async
 * @param {Array<string>} followings - The list of following user IDs.
 * @param {number} page - The page number.
 * @returns {Promise<any>} Returns the data of the response with the countries and their visitor user IDs.
 */
export async function fetchCountriesWithVisitors(followings: Array<string>, page: number): Promise<any> {
    return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/country/getAllCountriesTest?page=${page}`, 
    { 
        followings: followings
    })
    .then((response) => {
        return response.data;
    });
}
