"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import { toast } from "react-toastify";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useIsLoaded } from "@/hooks/useIsLoaded";
import { defaultFormData, FormScheme, login as _login } from "@/services/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const router = useRouter();
	const [form, setForm] = useState(defaultFormData);
	const [errorForm, setErrorForm] = useState(defaultFormData);
	const [loading, setLoading] = useState(false);
	const loaded = useIsLoaded("/", true);

	const login: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const req = await _login(form);

			if (req.success) {
				setLoading(false);
				setErrorForm(defaultFormData);
				setForm(defaultFormData);
				router.push("/goods-receipt");
			} else {
				setLoading(false);

				if (req.errors.message) {
					toast.error(req.errors.message, { position: "top-right" });
					return;
				}

				setErrorForm(req.errors as any);
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { value, name } = e.currentTarget;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	if (!loaded) {
		return;
	}

	return (
		<div className="w-full h-screen flex justify-center items-center bg-[#FAFAFC]">
			<div className="w-[476px] bg-white rounded-lg border-[1px] border-[#EDEFF6] box-border px-6 py-10 shadow">
				<div className="relative h-8 w-full mt-8 mb-14">
					<h1>SAMB TEST</h1>
				</div>

				<form id="form-login" onSubmit={login}>
					<TextInput
						id="email"
						name="email"
						label="Email"
						containerClassName="mt-2"
						inputClassName="text-[14px]"
						labelClassName="mb-1 text-[16px] font-bold font-[var(--font-dm-sans)]"
						onChange={onChange}
						value={form.email}
						error={errorForm.email}
					/>
					<TextInput
						id="password"
						name="password"
						label="Password"
						containerClassName="mt-2"
						inputClassName="text-[14px]"
						labelClassName="mb-1 text-[16px] font-bold font-[var(--font-dm-sans)]"
						onChange={onChange}
						value={form.password}
						error={errorForm.password}
						type="password"
					/>
					<Button
						className="flex justify-center h-12 mt-8 text-[16px] tracking-widest"
						loading={loading}
						onClick={login as any}
					>
						LOGIN
					</Button>
					<button
						type="submit"
						style={{ height: 0, width: 0 }}
					></button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
