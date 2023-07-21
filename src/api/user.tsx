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

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/createUser`, { userId: id, Email : email,  Username: Username,  picture : picture }).then((response) => {
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
		const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getUsernameById`, { userId: id });
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Get the followings of a user by user ID.
 *
 * @async
 * @param {string} userId - The user ID.
 * @returns {Promise<any>} Returns the data of the response if the request is successful.
 * @throws {Error} If the request fails, it throws an error.
 */
export async function getFollowDetails(userId: string): Promise<any> {	
	if (userId === undefined)
		return;

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getFollowDetails`, { userId: userId }).then((response) => {
		return response.data;
	});
}

/**
 * Searches for a user by a query string.
 * 
 * @async
 * @function
 * @param {string} query - The query string to search for a user.
 * @returns {Promise<Object>} - Returns a promise that resolves with the data from the response.
 * 
 */
export async function searchUser(query: string): Promise<Object> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/user/searchUser/${query}`).then((response) => {
            return response.data
	});
}

/**
 * Fetches the profile picture of a user by their user ID.
 * 
 * @async
 * @param {string} userId - The ID of the user whose profile picture is to be fetched.
 * @returns {Promise<string | null>} - Returns a promise that resolves with the URL of the profile picture or null if not found.
 * 
 */
export async function getProfilePicture(userId: string): Promise<string | null> {
	if (userId === undefined)
		return null;

	return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getProfilePicture`, {userId}).then((response) => {
		return response.data;
	});
}

/**
 * Sends a follow request to the server
 * @async
 * @function
 * @param {string} follower - ID of the user who wants to follow someone.
 * @param {string} followed - ID of the user who is going to be followed.
 * @returns {Promise<any>} - The response from the server.
 */
export async function follow(follower: string, followed: string): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/follow`, {
        followed: followed,
        follower : follower
    }).then((response) => {
		return response;
	});
}

/**
 * Sends an unfollow request to the server
 * @async
 * @function
 * @param {string} follower - ID of the user who wants to unfollow someone.
 * @param {string} followed - ID of the user who is going to be unfollowed.
 * @returns {Promise<any>} - The response from the server.
 */
export async function unfollow(follower: string, followed: string): Promise<any> {
	return axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/user/unfollow`, {
        followed: followed,
        follower : follower
    }).then((response) => {
		return response;
	});
}

/**
 * Search all entities by query.
 *
 * @async
 * @param {string} query - The query to search.
 * @returns {Promise<any>} Returns the data of the response.
 */
export async function searchAll(query: string): Promise<any> {
	return axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/search/searchAll/${query}`).then((response) => {
        return response.data;
	});
}


/**
 * Get users by their IDs.
 *
 * @async
 * @param {string[]} ids - The user IDs.
 * @returns {Promise<any>} Returns the data of the response if the request is successful.
 * @throws {Error} If the request fails or the user IDs are not provided, it throws an error or logs it.
 */
export async function getUsersById(ids: string[]): Promise<any> {
	if(!ids || ids.length === 0)
		return; 

	try {
		const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/getUsersById`, { userIds: ids });
		return response.data;
	} catch (error) {
		console.log(error);
	}
}
