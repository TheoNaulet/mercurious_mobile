import axiosInstance from "./interceptor";

/**
 * Get places feed.
 *
 * @async
 * @returns {Promise<any>} Returns the data of the response.
 * @throws {Error} Logs error details if the request fails.
 */
export async function getPlacesFeed(): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/places/getPlacesFeed`).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error('Erreur axios:', error);
        console.error('Détails de l\'erreur:', error.response);}
)}

/**
 * Get places feed.
 *
 * @async
 * @returns {Promise<any>} Returns the data of the response.
 * @throws {Error} Logs error details if the request fails.
 */
export async function getNewPlacesFeed(): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/places/getNewPlacesFeed`).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error('Erreur axios:', error);
        console.error('Détails de l\'erreur:', error.response);}
)}


export async function getPlaceByIdAndUserInteractions(placeId: string, userId: string): Promise<any> {
	if (placeId === undefined || userId === undefined)
		return;

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getPlaceByIdAndUserInteractions`, { placeId: placeId, userId: userId }).then((response) => {
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
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/places/searchPlace/${query}`).then((response) => {
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
export async function getPlacesByCity(city: string, page:number): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/places/getPlacesByCity/${city}?page=${page}`).then((response) => {
		return response.data;
	});
}

type Place = { id: string; city: string; country: string; name: string; note: number; picture: string; extraImage: string; };

/**
 * Like a place.
 *
 * @async
 * @param {string} uid - The user ID.
 * @param {string} id - The place object to like.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function likePlace(uid: string, id: string, city: string): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/likePlace`, {
        userId: uid,
        liked : id,
		city: city
    }).then((response) => {
		return response;
	});
}

/**
 * Unlike a place.
 *
 * @async
 * @param {string} uid - The user ID.
 * @param {string} id - The place object to unlike.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function unlikePlace(uid: string, id: string): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/unlikePlace`, {
        userId: uid,
        unlike : id
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
 * @param {string} uid - The user ID.
 * @param {string} placeId - The place id to unvisit.
 * @returns {Promise<any>} Returns the response of the request.
 */
export async function unvisitPlace(uid: string, placeId: string): Promise<any>  {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/unvisitPlace`, {
        userId: uid,
        unvisit : placeId
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
 * @param {string} visit - The place id to visit.
 * @returns {Promise<any>} Returns the response of the request.
 * @throws {Error} Throws error if the request fails.
 */
export async function visitPlace(id: string, visit: string): Promise<any> { 
    return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/visitPlace`, {
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

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getVisitedPlacesByCity`, { userId:id , city: city }).then((response) => {
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
	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getLikedPlacesByCity`, { userId:id, city:city })
		.then((response) => {
			return response.data;
		});
}


export async function getAllPlacesByIdAndUserInteractions(placeIds: string[], userId: string): Promise<any> {
	if (!placeIds || !userId)
		return;

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/search/getAllPlacesByIdAndUserInteractions`, { placeIds: placeIds, userId: userId }).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error('Erreur axios:', error);
        console.error('Détails de l\'erreur:', error.response);}
)}


export async function visitPlaceCityCountry(id: string, place: any, city: any, country: any): Promise<any> {
    return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/visitPlaceCityCountry`, {
        userId: id,
        place: place,
        city: city,
        country: country
    }).then(response => {
        return response;
    }).catch(error => {
        console.error(error);
        throw error;
    });
}

export async function likePlaceCityCountry(id: string, place: any, city: any, country: any): Promise<any> {
    return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/likePlaceCityCountry`, {
        userId: id,
        place: place,
        city: city,
        country: country
    }).then(response => {
        return response;
    }).catch(error => {
        console.error(error);
        throw error;
    });
}

export async function getAllPlaceByIdAndUserInteractions(placeIds: Array<string>, userId: string, friendIds: Array<string>): Promise<any> {
	if (placeIds === undefined || userId === undefined)
		return;

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/places/getAllPlacesByIdAndUserInteractions`, { placeIds: placeIds, userId: userId, friendIds: friendIds}).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error('Erreur axios:', error);
        console.error('Détails de l\'erreur:', error.response);}
)}