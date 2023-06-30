import axiosInstance from "./interceptor";

export async function getCountries(){
    return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getAllCountries`).then((response) => {
        return(response.data);
    });
}

export async function getCountriesByContinent(continent: string){
    return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getContinent/${continent}`).then((response) => {
        return(response.data);
    });
}

export async function searchCountry(query: any) {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/searchCountry/${query}`).then((response) => {
            return response.data
	});
}

export async function getLikedCountries(id: string | undefined) {
    if(!id){
		return;
	}
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getLikedCountries/${id}`).then((response) => {
		return response.data;
	});
}

export async function getCountryByName(name: string){
    try {
        return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getCountryByName${name}`).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.log('error : ', error)
    }
}

export async function likeCountry(id: any, liked: any) {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/likeCountry`, {
        userId: id,
        liked : liked
    }).then((response) => {
		return response;
	});
}

export async function visitCountry(id: string | undefined, visited: any) {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/visitCountry`, {
        userId: id,
        visited : visited
    }).then((response) => {
		return response;
	});
}

export async function getVisitedCountries(id: string | undefined) {
    if(!id){
		return;
	}
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getVisitedCountries${id}`).then((response) => {
		return response.data;
	});
}