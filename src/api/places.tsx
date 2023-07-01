import axiosInstance from "./interceptor";

/**
 * Get places feed.
 *
 * @async
 * @returns {Promise<any>} Returns the data of the response.
 * @throws {Error} Logs error details if the request fails.
 */
export async function getPlacesFeed(): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getPlacesFeed`).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error('Erreur axios:', error);
        console.error('Détails de l\'erreur:', error.response);}
)}

/**
 * Search a place by query.
 *
 * @async
 * @param {string} query - The query to search.
 * @returns {Promise<any>} Returns the data of the response.
 */
export async function searchPlace(query: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/searchPlace/${query}`).then((response) => {
            return response.data
	});
}

/**
 * Get places by city.
 *
 * @async
 * @param {string} city - The city to search places in.
 * @returns {Promise<any>} Returns the data of the response.
 */
export async function getPlacesByCity(city: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getPlaces${city}`).then((response) => {
		return response.data;
	});
}

type Place = { id: string; city: string; country: string; name: string; note: number; picture: string; extraImage: string; };

/**
 * Like a place.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {Place} liked - The place object to like.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function likePlace(id: string, liked: Place): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/likePlace`, {
        userId: id,
        liked : liked
    }).then((response) => {
		return response;
	});
}

/**
 * Unlike a place.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {Place} liked - The place object to unlike.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function unlikePlace(id: string, liked: Place): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/unlikePlace`, {
        userId: id,
        liked : liked
    }).then((response) => {
		return response;
	});
}

/**
 * Check if a place is liked.
 *
 * @async
 * @param {string} id - The place ID.
 * @param {string} userId - The user ID.
 * @returns {Promise<any>} Returns the data of the response if the place is liked.
 */
export async function isLiked(id: string, userId: string): Promise<any> {
	if(!userId || !id){
		return;
	}

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/isLiked/${id}/${userId}`).then((response) => {
		return response.data;
	})
};

/**
 * Unvisit a place.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {Place} visit - The place object to unvisit.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function unvisitPlace(id: string, visit: Place): Promise<any>  {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/unvisitPlace`, {
        userId: id,
        visit : visit
    }).then((response) => {
		return response;
	});
}

/**
 * Check if a place is visited.
 *
 * @async
 * @param {string} id - The place ID.
 * @param {string} userId - The user ID.
 * @returns {Promise<any>} Returns the data of the response if the place is visited.
 */
export async function isVisited(id: string, userId: string): Promise<any> {
	if(!userId){
		return;
	}

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/isVisited/${id}/${userId}`).then((response) => {
		return response.data;
	})
};

/**
 * Visit a place.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {Place} visit - The place object to visit.
 * @returns {Promise<any>} Returns the response of the request.
 * @throws {Error} Throws error if the request fails.
 */
export async function visitPlace(id: string, visit: Place): Promise<any> { 
    return axiosInstance.put(`${process.env.REACT_APP_API_URL}/visitPlace`, {
        userId: id,
        visit: visit
    }).then(response => {
        return response;
    }).catch(error => {
        console.error(error);
        throw error;
    });
}

/**
 * Count visited places by user ID.
 *
 * @async
 * @param {string} id - The user ID.
 * @returns {Promise<any>} Returns the data of the response with the count of visited places.
 * @throws {Error} Logs error if the request fails.
 */
export async function countVisitedMonuments(id: string): Promise<any> {
	if(!id){
		return;
	}
	try {
		const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/countVisitedPlaces/${id}`)
		return response.data
	} catch (error) {
		console.log(error)
	}
};

/**
 * Get visited places by user ID and city.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {string} city - The city to search visited places in.
 * @returns {Promise<any>} Returns the data of the response with the visited places.
 */
export async function getVisitedPlaces(id: string | undefined, city: string): Promise<any> {
    if(!id ){
		return;
	}

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getVisitedPlacesByCity/${id}/${city}`).then((response) => {
		return response.data;
	});
}

/**
 * Get place by ID.
 *
 * @async
 * @param {any} id - The place ID.
 * @returns {Promise<any>} Returns the data of the response with the place.
 */
export async function getPlaceById(id: any): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getPlacesById/${id}`).then((response) => {
		return response.data;
	});
}

/**
 * Get liked places by user ID and city.
 *
 * @async
 * @param {any} id - The user ID.
 * @param {any} city - The city to search liked places in.
 * @returns {Promise<any>} Returns the data of the response with the liked places.
 */
export async function getLikedPlacesByCity(id: any, city: any): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getLikedPlacesByCity/${id}/${city}`).then((response) => {
		return response.data; 
	});
}