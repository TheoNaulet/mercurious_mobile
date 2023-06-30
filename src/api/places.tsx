import axiosInstance from "./interceptor";

export async function getPlacesFeed() {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getPlacesFeed`).then((response) => {
		return response.data;
	}).catch((error) => {
		console.error('Erreur axios:', error);
        console.error('Détails de l\'erreur:', error.response);}
)}

export async function searchPlace(query: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/searchPlace/${query}`).then((response) => {
            return response.data
	});
}

export async function getPlacesByCity(city: string) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getPlaces${city}`).then((response) => {
		return response.data;
	});
}
export async function likePlace(id: string | undefined, liked: { id: string; city: string; country: string; name: string; note: number; picture: string; extraImage: string; }) {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/likePlace`, {
        userId: id,
        liked : liked
    }).then((response) => {
		return response;
	});
}

export async function unlikePlace(id: string | undefined, liked: { id: string; city: string; country: string; name: string; note: number; picture: string; extraImage: string; }) {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/unlikePlace`, {
        userId: id,
        liked : liked
    }).then((response) => {
		return response;
	});
}

export async function isLiked(id: string, userId: string | undefined) {
	if(!userId || !id){
		return;
	}

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/isLiked/${id}/${userId}`).then((response) => {
		return response.data;
	})
};

export async function unvisitPlace(id: string | undefined, visit: { id: string; city: string; country: string; name: string; note: number; picture: string; extraImage: string; }) {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/unvisitPlace`, {
        userId: id,
        visit : visit
    }).then((response) => {
		return response;
	});
}
export async function isVisited(id: string, userId: string | undefined) {
	if(!userId){
		return;
	}

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/isVisited/${id}/${userId}`).then((response) => {
		return response.data;
	})
};
export async function visitPlace(id: string | undefined, visit: { id: string; city: string; country: string; name: string; note: number; picture: string; extraImage: string; }) { 
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

export async function countVisitedMonuments(id: string | undefined) {
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

export async function getVisitedPlaces(id: string | undefined, city: never) {
    if(!id ){
		return;
	}

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getVisitedPlacesByCity/${id}/${city}`).then((response) => {
		return response.data;
	});
}

export async function getPlaceById(id: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getPlacesById/${id}`).then((response) => {
		return response.data;
	});
}

export async function getLikedPlacesByCity(id: any, city: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getLikedPlacesByCity/${id}/${city}`).then((response) => {
		return response.data; 
	});
}