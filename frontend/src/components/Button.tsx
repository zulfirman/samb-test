"use client";

import { ChangeEvent } from "react";

type ButtonType = "transparent" | "primary" | "secondary" | "border";

type ButtonProps = {
	children: React.ReactNode;
	pre?: React.ReactNode;
	post?: React.ReactNode;
	onClick?: (e?: undefined | ChangeEvent<HTMLInputElement>) => void;
	className?: HTMLDivElement["className"];
	style?: ButtonType;
	loading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit" | "file";
	name?: string;
};

const Button = ({
	children,
	className = "",
	onClick,
	style = "primary",
	loading = false,
	disabled = false,
	type = "button",
	name = "",
}: ButtonProps) => {
	const classes: { [key in ButtonType]: string } = {
		transparent: " ",
		primary: `text-white font-semibold shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${
			disabled || loading
				? "bg-[rgba(227,84,112)]"
				: "cursor-pointer bg-primary-500 hover:bg-primary-700"
		} `,
		secondary:
			"text-dark-grey-500 font-semibold bg-blue-grey-100 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer hover:bg-blue-grey-300",
		border: "border-[1px] border-blue-grey-700 text-dark-grey-500 cursor-pointer",
	};

	const onClickFile = () => {
		const eInputFile = document.getElementById(
			`file-${name}`
		) as HTMLInputElement;
		eInputFile.click();

		eInputFile.value = "";
	};

	return (
		<button
			type={type}
			onClick={(type == "file" ? onClickFile : onClick) as any}
			className={`h-10 flex items-center overflow-hidden rounded-lg text-[14px] px-[14px] transition-all box-border relative ${classes[style]} ${className}`}
		>
			{type == "file" ? (
				<input
					type="file"
					id={`file-${name}`}
					style={{ display: "none" }}
					onChange={(e) => {
						onClick && onClick(e as any);
					}}
				/>
			) : null}


			{loading ? (
				<svg
					aria-hidden="true"
					className="inline w-6 h-6 text-gray-200 animate-spin fill-primary-500"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
