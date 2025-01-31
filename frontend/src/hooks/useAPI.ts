"use client";

import { apiFunc, ApiFuncOptions, RequestMethod } from "@/config/api";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

export function useAPI(router: ReturnType<typeof useRouter>) {
	const requestAPI = async (url: string, method: RequestMethod, axiosConfigs?: ApiFuncOptions) => {
		try {
			const req = await apiFunc(url, method, axiosConfigs);
			return req;
		} catch (err) {
			if (isAxiosError(err)) {
				if (err.response?.status == 401) {
					localStorage.removeItem("tokens");
					router.push("/login");
					return err.response;
				}
			}

			return Promise.reject(err);
		}
	}

	return { router, requestAPI }
}
