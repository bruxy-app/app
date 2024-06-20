import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
	baseURL: 'http://192.168.0.28:8080/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

// api.interceptors.request.use(async () => {
// 	const treatmentUuid = await AsyncStorage.getItem('treatmentUuid');
// 	if (treatmentUuid) {
// 		api.defaults.headers.common['Treatment-Uuid'] = treatmentUuid;
// 	}
// });

api.interceptors.response.use(
	(response) => response.data,
	(error) => {
		console.log(JSON.stringify(error));
		if (error.response && error.response.status === 401) {
			AsyncStorage.setItem('treatmentUuid', '');
		}
		return Promise.reject(error);
	}
);

export { api };
