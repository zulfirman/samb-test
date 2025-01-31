import api, { Tokens } from "@/config/api";
import messages from "@/helpers/messages";
import { APIResponse } from "@/types/common";
import { User } from "@/types/user";
import { isAxiosError } from "axios";
import { z } from "zod";

type LoginReturn = {
	success: boolean;
	errors: {
		[key: string]: string
	};
}

export const FormScheme = z.object({
	email: z
		.string({ required_error: messages.errors.required("Email") })
		.min(1, { message: messages.errors.required("Email") })
		.email({ message: messages.errors.email() }),
	password: z
		.string({ required_error: messages.errors.required("Password") })
		.min(1, { message: messages.errors.required("Password") }),
});

export const defaultFormData: z.infer<typeof FormScheme> = {
	email: "",
	password: "",
};

export async function login(form: { email: string; password: string; }) {
	const response: LoginReturn = {
		success: false,
		errors: {}
	}

	try {
		FormScheme.parse(form);

		const req = await api.post("signin", {
			...form,
			// timeoutDuration: 100,
			timeoutDuration: 100000,
		});
		const res: APIResponse<Tokens & { signIn: User }> = req.data;

		if (res.code == 200) {
			response.success = true;

			const tokens: Tokens = {
				accessToken: res.content.accessToken,
				refreshToken: res.content.refreshToken,
			};

			window.localStorage.setItem("tokens", JSON.stringify(tokens));
		}

		return response;
	} catch (err) {
		if (err instanceof z.ZodError) {
			const errEmail = err.issues.find(
				(val) => val.path[0] == "email"
			);
			const errPassword = err.issues.find(
				(val) => val.path[0] == "password"
			);

			response.errors.email = errEmail ? errEmail.message : ""
			response.errors.password = errPassword ? errPassword.message : ""

		} else if (isAxiosError(err)) {
			const res: APIResponse = err.response?.data;

			if (res.content.message) {
				response.errors.message = res.content.message;
			}
		} else {
			console.log(err);
		}

		return response;
	}
}
