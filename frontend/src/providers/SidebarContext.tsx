"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

const initialValue = {
	isOpen: false,
	activeItem: "product-description",
	toggleOpen: () => {},
	setActiveItem: (name: string) => {},
	getSidebarWidth: () => {},
};

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, _setOpen] = useState(false);
	const pathname = usePathname().replace("/", "");
	const [activeItem, _setActiveItem] = useState(pathname);

	const toggleOpen = () => {
		_setOpen((prevState) => !prevState);
	};

	const setActiveItem = (name: string) => {
		_setActiveItem(name);
	};

	const getSidebarWidth = () => {
		console.log(window.innerHeight, window.innerWidth);
	};

	return (
		<SidebarContext.Provider
			value={{
				activeItem,
				isOpen,
				setActiveItem,
				toggleOpen,
				getSidebarWidth,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

const useSidebar = () => useContext(SidebarContext);

export { SidebarContext, SidebarProvider, useSidebar };
