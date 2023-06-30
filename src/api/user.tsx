import axiosInstance from "./interceptor";

export async function createNewUser(id: any, email: string, Username: string, picture: any) {
    if (!Username) {
        const randomNum = Math.floor(Math.random() * 900000) + 100000;
        Username = `User${randomNum}`;
    }

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/createUser`, { userId: id, Email : email,  Username: Username,  picture : picture }).then((response) => {
		return ({response, email, id, Username});
	});
}

export async function getUsername(id: string | undefined) {
	if(!id)
		return; 

	try {
		const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/getUsername/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function getFollowers(userId: string) {
	if (userId === undefined)
		return;

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getFollowers/${userId}`).then((response) => {
		return response.data;
	});
}

export async function getFollowings(userId: string) {
	if (userId === undefined)
		return;

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getFollowings/${userId}`).then((response) => {
		return response.data;
	});
}