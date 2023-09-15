import axios, { type AxiosInstance } from 'axios';

class Http {
	public http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		});

		this.defineInterceptor();
	}

	defineInterceptor() {
		this.http.interceptors.response.use(
			(response: any) => response,
			(error: any) => {
				// if (error.request.status && error.request.status === 401) {
				// 	if (sessionStorage.getItem('token')) {
				// 		sessionStorage.removeItem('token');
				// 		store.dispatch(AUTH_LOGOUT);
				// 		router.push({ name: 'Login' });
				// 	}
				// }
				return Promise.reject(error);
			},
		);
	}
}

export default class SingletonHttp {
	static instance: Http;

	constructor() {
		throw new Error('Use SingletonHttp.getInstance()');
	}

	static getInstance() {
		if (!SingletonHttp.instance) {
			SingletonHttp.instance = new Http();

			if (sessionStorage.getItem('token')) {
				SingletonHttp.instance.http.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
					'token',
				)}`;
			}
		}

		return SingletonHttp.instance;
	}
}
