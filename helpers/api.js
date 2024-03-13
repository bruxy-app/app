import axios from 'axios';
import { BASE_API_URL } from '@env';

const api = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export { api };
