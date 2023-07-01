import axiosInstance from "./interceptor";

/**
 * Create a new user.
 *
 * @async
 * @param {string} id - The user ID.
 * @param {string} email - The user's email.
 * @param {string} Username - The username. If not provided, a random username will be generated.
 * @param {any} picture - The user's profile picture.
 * @returns {Promise<{response: any, email: string, id: any, Username: string}>} Returns an object with the response, email, id, and username.
 * @throws {Error} If the request fails, it throws an error.
 */
export async function createNewUser(id: string, email: string, Username: string, picture: any): Promise<{response: any, email: string, id: any, Username: string}> {
    if (!Username) {
        const randomNum = Math.floor(Math.random() * 900000) + 100000;
        Username = `User${randomNum}`;
    }

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/createUser`, { userId: id, Email : email,  Username: Username,  picture : picture }).then((response) => {
		return ({response, email, id, Username});
	});
}

/**
 * Get a username by user ID.
 *
 * @async
 * @param {string} id - The user ID.
 * @returns {Promise<any>} Returns the data of the response if the request is successful.
 * @throws {Error} If the request fails or the user ID is not provided, it throws an error or logs it.
 */
export async function getUsername(id: string): Promise<any> {
	if(!id)
		return; 

	try {
		const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/getUsername/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Get the followers of a user by user ID.
 *
 * @async
 * @param {string} userId - The user ID.
 * @returns {Promise<any>} Returns the data of the response if the request is successful.
 * @throws {Error} If the request fails, it throws an error.
 */
export async function getFollowers(userId: string): Promise<any> {
	if (userId === undefined)
		return;

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getFollowers/${userId}`).then((response) => {
		return response.data;
	});
}

/**
 * Get the followings of a user by user ID.
 *
 * @async
 * @param {string} userId - The user ID.
 * @returns {Promise<any>} Returns the data of the response if the request is successful.
 * @throws {Error} If the request fails, it throws an error.
 */
export async function getFollowings(userId: string): Promise<any> {
	if (userId === undefined)
		return;

	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/getFollowings/${userId}`).then((response) => {
		return response.data;
	});
}