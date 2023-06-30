import axiosInstance from "./interceptor";

export async function getAllCities() {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getAllCity`).then((response) => {
		return(response.data);
	});
}

export async function getCitiesByCountry(country: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getAllCities${country}`)
		.then((response) => {
			return response.data;
		});
}

export async function searchCity(query: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/searchCity/${query}`).then((response) => {
            return response.data
	});
}

export async function getLikedCitiesByCountry(id: string, countryName: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getLikedCitiesByCountry/${id}/${countryName}`)
		.then((response) => {
			return response.data;
		});
}

export async function getCityByName(name: string) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getCityByName${name}`)
		.then((response) => {
			return response.data;
		});
}

export async function likeCity(id: any, liked: any) {
	return axiosInstance
		.put(`${process.env.REACT_APP_API_URL}/likeCity`, {
			userId: id,
			liked: liked,
		})
		.then((response) => {
			return response;
		});
}

export async function visitCity(id:string, visit) {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/visitCity`, {
			userId: id,
			visit: visit
		}).then((response) => {
			return response;
		});
}

export async function getVisitedCitiesByCountry(id:string, countryName:string) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getVisitedCitiesByCountry/${id}/${countryName}`)
		.then((response) => {
			return response.data;
		});
}