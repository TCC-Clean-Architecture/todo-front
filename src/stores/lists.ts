import Http from '@/utils/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

const http = Http.getInstance();

type IList = {
	_id: string;
	name: string;
	todos: ITodo[];
	createdAt: string;
};

type ITodo = {
	_id: string;
	name: string;
	description: string;
	status: string;
	createdAt: string;
};

interface IReponseMessage<T> {
	content: T;
	description: string;
	message: string;
	statusCode: number;
	type: string;
}

type IListBasic = Pick<IList, 'name'>;

interface IListsStoreState {
	lists: IList[];
}

export const useListsStore = defineStore('lists', {
	state: (): IListsStoreState => ({
		lists: [],
	}),
	getters: {
		getLists: (state) => state.lists,
	},
	actions: {
		GET_LISTS(): Promise<IList[]> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: '/todos/lists',
				})
					.then((response: AxiosResponse<IReponseMessage<IList[]>>) => {
						this.lists = response.data.content;
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		GET_LIST(id: string): Promise<IList> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: `/todos/list/${id}`,
				})
					.then((response: AxiosResponse<IReponseMessage<IList>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		CREATE_LIST(body: IListBasic): Promise<IList> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/todos/list',
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<IList>>) => {
						this.lists.push(response.data.content);
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		DELETE_LIST(id: string): Promise<Pick<IList, '_id'>> {
			return new Promise((resolve, reject) => {
				http({
					method: 'DELETE',
					url: `/todos/list/${id}`,
				})
					.then((response: AxiosResponse<IReponseMessage<Pick<IList, '_id'>>>) => {
						this.lists = this.lists.filter((t) => t._id !== id);
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
	},
});
