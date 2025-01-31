import { ChangeEventHandler, useState } from "react";

export function useFilter() {
	const [filter, setFilter] = useState({
		sort: 0,
		search: ""
	});

	const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.currentTarget;
		setFilter(prev => ({
			...prev,
			[name]: value
		}))
	}

	const onChange = (value: any, field: keyof typeof filter) => {
		setFilter(prev => ({
			...prev,
			[field]: value
		}))
	}

	return {
		filter,
		setFilter,
		onChange,
		onChangeInput
	}
}
