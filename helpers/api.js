import axios from 'axios';
import { BASE_API_URL } from '@env';

const api = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

api.interceptors.response.use(
	(response) => response.data,
	(error) => {
		if (error.response.status === 401) {
			console.log('Unauthorized');
		}

		return Promise.reject(error);
	}
);

export { api };
