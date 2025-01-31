"use client";

import { Option } from "@/types/common";
import { useMemo } from "react";
import Select, {
	ControlProps,
	StylesConfig,
	components,
	OptionProps,
} from "react-select";

type SelectInputProps = {
	data: Option[];
	name: string;
	value?: Option;
	hiddenValue?: any;
	placeholder?: string;
	containerClassName?: HTMLDivElement["className"];
	className?: HTMLDivElement["className"];
	isClearable?: boolean;
	preContent?: React.ReactNode;
	valueWithCheckbox?: boolean;
	onChange?: (newValue: Option) => void;
	menuPlacement?: "auto" | "top" | "bottom";
	menuWidth?: string;
};

const baseStyles: StylesConfig = {
	control: (styles, state) => ({
		...styles,
		borderRadius: 8,
		borderWidth: 1,
		height: 40,
		borderColor: "#e5e7eb",
		cursor: "pointer",
		outlineWidth: state.isFocused ? 0 : 0,
		":hover": {
			borderColor: state.isFocused
				? "var(--color-blue-grey-700)"
				: "#bbb",
		},
	}),
	indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
	singleValue: (styles) => ({ ...styles, fontSize: 14, marginLeft: 8 }),
	menuPortal: (styles) => ({ ...styles }),
	placeholder: (styles) => ({
		...styles,
		fontSize: 14,
		fontWeight: 600,
		fontFamily: "var(--font-dm-sans)",
		color: "#4D4D4D",
	}),
};

const SelectInput = ({
	data,
	className = "",
	containerClassName = "",
	isClearable = false,
	placeholder = "",
	value,
	preContent,
	name,
	valueWithCheckbox = false,
	hiddenValue,
	onChange,
	menuPlacement = "bottom",
	menuWidth = "100%",
}: SelectInputProps) => {
	const extendedStyles: StylesConfig = useMemo(
		() => ({
			...baseStyles,
			dropdownIndicator: (styles, state) => ({
				...styles,
				transform: state.selectProps.menuIsOpen
					? "rotate(180deg)"
					: "rotate(0deg)",
				transition: "all 0.3s ease",
				display: preContent != undefined ? "none" : "flex",
			}),
			option: (styles, state) => ({
				...styles,
				backgroundColor:
					!valueWithCheckbox &&
					hiddenValue != undefined &&
					hiddenValue == (state.data as any).value
						? "var(--color-primary-500)"
						: "white",
				color:
					!valueWithCheckbox &&
					hiddenValue != undefined &&
					hiddenValue == (state.data as any).value
						? "white"
						: "var(--color-dark-grey-500)",
				transition: "all 0.3s ease",
				cursor: "pointer",
				fontSize: 12,
				fontWeight: 600,
				fontFamily: "var(--font-dm-sans)",
				paddingLeft: preContent != undefined ? 14 : 12,
				":hover": {
					backgroundColor:
						!valueWithCheckbox &&
						hiddenValue != undefined &&
						hiddenValue == (state.data as any).value
							? "none"
							: "var(--color-blue-grey-100)",
				},
			}),
			menuList: (styles) => ({
				...styles,
				padding: 0,
			}),
			menu: (styles, state) => ({
				...styles,
				margin: "6px 0 ",
				borderRadius: 8,
				overflow: "hidden",
				width: `calc(${menuWidth})`,
				marginLeft: `calc(100% - ${menuWidth})`,
			}),
		}),
		[preContent, hiddenValue, menuWidth, valueWithCheckbox]
	);

	const Control = ({ children, ...props }: ControlProps) => {
		return (
			<components.Control {...props}>
				{preContent ? preContent : null}
				{children}
			</components.Control>
		);
	};

	const Option = ({ children, ...props }: OptionProps) => {
		return (
			<components.Option {...props}>
				{valueWithCheckbox ? (
					<input
						checked={(props.data as any).checked}
						className="w-3 h-3 rounded-[2px]  border-[1px] border-[rgba(163,174,208,1)] mr-3 ml-1 accent-primary-500"
						onChange={() => console.log(props.data)}
						type="checkbox"
					/>
				) : null}
				{children}
			</components.Option>
		);
	};

	return (
		<div className={`h-10  ${containerClassName}`}>
			<Select
				className={`${className}`}
				components={{ Control, Option }}
				defaultInputValue={placeholder}
				isClearable={isClearable}
				isSearchable={false}
				menuPlacement={menuPlacement}
				name={name}
				onChange={onChange as any}
				options={data}
				placeholder={placeholder}
				styles={extendedStyles}
				value={value}
			/>
		</div>
	);
};

export default SelectInput;
