"use client";

import SearchIcon from "./icons/SearchIcon";

type TextInputProps = {
	placeholder?: string;
	name: string;
	type?: "text" | "password";
	containerClassName?: HTMLDivElement["className"];
	className?: HTMLDivElement["className"];
	value?: string;
	search?: boolean;
	postContent?: React.ReactNode;
	label?: string;
	id: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClickSearch?: () => void;
	disabled?: boolean;
	inputClassName?: HTMLDivElement["className"];
	labelClassName?: HTMLDivElement["className"];
	error?: string;
};

const TextInput = ({
	name,
	type = "text",
	className = "",
	containerClassName = "",
	inputClassName = "",
	labelClassName = "",
	placeholder = "",
	value = "",
	search = false,
	label,
	id,
	postContent,
	onChange,
	disabled = false,
	error = "",
}: TextInputProps) => {
	return (
		<div className={`w-full ${containerClassName}`}>
			{label ? (
				<p className={`text-[14px] font-medium mb-2 ${labelClassName}`}>
					<label htmlFor={id}>{label}</label>
				</p>
			) : null}

			<div
				className={`flex items-center border-[1px] border-blue-grey-700 w-full overflow-hidden box-border rounded-lg transition-all h-10 hover:border-dark-grey-500 focus-within:border-[rgba(33,90,255,1)] ${className}`}
			>
				<input
					id={id}
					className={`h-10 pl-[14px] w-full outline-none placeholder:text-[14px] text-[12px] ${
						disabled ? "text-gray-400" : ""
					} ${inputClassName}`}
					placeholder={placeholder}
					type={type}
					name={name}
					value={onChange ? undefined : value}
					defaultValue={onChange ? value : undefined}
					onChange={onChange ? onChange : (e) => {}}
					disabled={disabled}
					// contentEditable={false}
				/>

				{search ? (
					<label>
						<div className="px-3 cursor-pointer">
							<SearchIcon className="stroke-[#A3AED0]" />
						</div>
					</label>
				) : postContent ? (
					postContent
				) : null}
			</div>
			{error != "" ? (
				<p className="text-primary-700 text-sm">{error}</p>
			) : null}
		</div>
	);
};

export default TextInput;
