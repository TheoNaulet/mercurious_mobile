import axios from 'axios';

/**
 * Axios instance configured with baseURL and headers.
 *
 * @type {AxiosInstance}
 */
const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * Axios request interceptor to add authorization token to request headers.
 */
axiosInstance.interceptors.request.use(
	(config) => {
		const token = process.env.REACT_APP_API_TOKEN;
		if (token) {
		config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
