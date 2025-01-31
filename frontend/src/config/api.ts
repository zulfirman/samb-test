import axios, { AxiosRequestConfig } from "axios";

export type Tokens = {
	accessToken: string;
	refreshToken: string;
}

export type RequestMethod = "post" | "delete" | "put" | "get";

export type ApiFuncOptions = AxiosRequestConfig & {
	withoutToken?: boolean
}

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_MAIN_SERVICE
})

api.interceptors.response.use((res) => {
	return res
}, (err) => {
	return Promise.reject(err);
});

export const apiFunc = async (url: string, method: RequestMethod, axiosConfigs?: ApiFuncOptions) => {
	try {
		const configs: AxiosRequestConfig = axiosConfigs ? axiosConfigs : {};
		let getTokens = localStorage.getItem("tokens")

		if (!configs.headers) {
			configs.headers = {}
		}

		configs.url = url;
		configs.method = method;

		if (getTokens && !axiosConfigs?.withoutToken) {
			const tokens: Tokens = JSON.parse(getTokens);

			if (tokens.accessToken) {
				configs.headers.Authorization = `${tokens.accessToken}`
			}

			if (tokens.refreshToken) {
				configs.headers["X-refresh-token"] = tokens.refreshToken;
			}
		}

		const req = await api(configs)

		return req
	} catch (err) {
		// localStorage.removeItem("tokens");

		return Promise.reject(err);
	}
}

export const fetcher = async (url: string, withoutToken: boolean | undefined = false) => {
	const configs: AxiosRequestConfig = {};
	let getTokens = localStorage.getItem("tokens")

	if (!configs.headers) {
		configs.headers = {}
	}

	if (getTokens && !withoutToken) {
		const tokens: Tokens = JSON.parse(getTokens);

		if (tokens.accessToken) {
			configs.headers.Authorization = tokens.accessToken
		}

		if (tokens.refreshToken) {
			configs.headers["X-refresh-token"] = tokens.refreshToken;
		}
	}

	const resp = await api.get(url, configs);
	return resp.data?.content || { data: [], pagination: {} };
}

export default api
