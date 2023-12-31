import axios, { AxiosResponse } from 'axios';
// import { PostType } from '../models/post.interface';

import {backendUrl} from '../config'

const instance = axios.create({
	baseURL: backendUrl,
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const ApiRequest = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

// export Requests;

// export const Post = {
// 	getPosts: (): Promise<PostType[]> => requests.get('posts'),
// 	getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
// 	createPost: (post: PostType): Promise<PostType> =>
// 		requests.post('posts', post),
// 	updatePost: (post: PostType, id: number): Promise<PostType> =>
// 		requests.put(`posts/${id}`, post),
// 	deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
// };