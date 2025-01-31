"use client";

import { useSidebar } from "@/providers/SidebarContext";

const Toggle = () => {
	const { toggleOpen } = useSidebar();

	const toggle = () => {
		toggleOpen();
	};

	return <button onClick={toggle}>Toggle</button>;
};

export default Toggle;
