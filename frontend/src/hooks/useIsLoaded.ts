"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useIsLoaded(redirectTo: string, login: boolean | undefined = false) {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const tokens = localStorage.getItem("tokens");

		if (login) {
			if (tokens) {
				router.push(redirectTo);
				return;
			}
		} else {
			if (!tokens) {
				router.push(redirectTo);
				return;
			}
		}

		setLoaded(true)
	}, [login, redirectTo, router])

	return loaded;
}
