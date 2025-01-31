"use client";

import { useState } from "react";

type ModalProps = {
	open: boolean;
	toggle: () => void;
	children: React.ReactNode;
};

const Modal = ({ open, toggle, children }: ModalProps) => {
	const activeBackdropClass = open
		? "h-screen w-screen dpr:h-[125vh] dpr:w-[125vw] bg-black/20 delay-[0s,0s,0.01s]"
		: "w-0 h-0 bg-transparent delay-[0.3s,0.3s,0s]";

	const activeContainerContentClass = open
		? "min-h-[200px] w-[542px] px-6 top-[50%] left-[50%] delay-[0s,0s,0.01s] -translate-x-[50%] -translate-y-[50%]"
		: "w-0 h-0 delay-[0.3s,0.3s,,0s]";

	return (
		<>
			<div
				onClick={toggle}
				className={`fixed z-10 cursor-pointer transition-[width,height,background-color] duration-[0s,0s,0.3s] ${activeBackdropClass}`}
			></div>
			<div
				className={`fixed z-10 bg-white rounded-2xl overflow-x-hidden overflow-y-auto max-h-[100vh] transition-[width,height,opacity] duration-[0s,0s,0.3s] ${activeContainerContentClass}`}
			>
				{children}
			</div>
		</>
	);
};

export const useModal = () => {
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen((prev) => !prev);

	return { open, setOpen, toggle };
};

export default Modal;
