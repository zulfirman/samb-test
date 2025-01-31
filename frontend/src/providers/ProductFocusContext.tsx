"use client";

import { createContext, useContext, useState } from "react";

const initialValue = {
	focus: false,
	id: "0_0",
	count: 0,
	setFocus: (id: string) => {},
	setUnfocus: () => {},
	setCount: (num: number) => {},
};

const ProductFocusContext = createContext(initialValue);

const ProductFocusProvider = ({ children }: { children: React.ReactNode }) => {
	const [focus, _setFocus] = useState(initialValue.focus);
	const [id, setId] = useState(initialValue.id);
	const [count, _setCount] = useState(0);

	const setFocus = (id: string) => {
		setId(id);
		_setFocus(true);
	};

	const setUnfocus = () => {
		setId("0_0");
		_setFocus(false);
	};

	const setCount = (num: number) => {
		_setCount(num);
	};

	return (
		<ProductFocusContext.Provider
			value={{
				focus,
				id,
				count,
				setUnfocus,
				setFocus,
				setCount,
			}}
		>
			{children}
		</ProductFocusContext.Provider>
	);
};

const useProductFocus = () => useContext(ProductFocusContext);

export { ProductFocusContext, ProductFocusProvider, useProductFocus };
