import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

class Http {
	public http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers': 'Content-Type, x-access-token',
			},
		});

		this.defineInterceptor();
	}

	defineInterceptor() {
		this.http.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: AxiosError) => {
				const authStore = useAuthStore();
				const router = useRouter();

				if (error.request.status === 401) {
					if (authStore.isAutenticated) {
						authStore.AUTH_LOGOUT();
						router.push({ name: 'Login' });
					}
				}
				return error;
			},
		);
	}
}

export default class SingletonHttp {
	static instance: AxiosInstance;

	constructor() {
		throw new Error('Use SingletonHttp.getInstance()');
	}

	static getInstance() {
		if (!this.instance) {
			const { http } = new Http();
			this.instance = http;

			const token = sessionStorage.getItem('token');
			if (token) this.defineToken(token);
		}
		return this.instance;
	}

	static defineToken(token: string) {
		this.instance.defaults.headers.common['x-access-token'] = `Bearer ${token}`;
	}
}
