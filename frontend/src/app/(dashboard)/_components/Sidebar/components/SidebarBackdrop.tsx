"use client";

type SidebarBackdropProps = {
	isOpen: boolean;
	toggleOpen: () => void;
};

const SidebarBackdrop = ({ isOpen, toggleOpen }: SidebarBackdropProps) => {
	const backdropOpenClass = isOpen
		? "delay-[0s,0.001s] translate-y-0 opacity-100"
		: "delay-[0.3s,0s] -translate-y-[200vh] opacity-0";

	return (
		<div
			onClick={toggleOpen}
			className={`fixed transition-[transform,opacity] duration-[0.001s,0.3s] inset-0 bg-black/25 cursor-pointer sm:hidden ${backdropOpenClass}`}
		/>
	);
};

export default SidebarBackdrop;
