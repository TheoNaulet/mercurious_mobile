import axiosInstance from "./interceptor";

/**
 * Upload a new user profile picture.
 *
 * @async
 * @param {string} userId - The user's ID.
 * @param {any} picture - The user's profile picture.
 * @returns {Promise<{response: any}>} Returns an object with the response.
 * @throws {Error} If the request fails, it throws an error.
 */
export async function uploadImage(userId: string, picture: any): Promise<{response: any}> {
    let localUri = picture.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('file', { uri: localUri, name: filename, type });
    formData.append('userId', userId);

    return axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/upload/uploadProfilePicture`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => {
        return {response};
    });
}

