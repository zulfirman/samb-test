"use client";

import CloseIcon from "../icons/CloseIcon";

type ModalHeaderProps = {
	children: React.ReactNode;
	className?: HTMLDivElement["className"];
	onClose?: () => void;
};

const ModalHeader = ({ children, className, onClose }: ModalHeaderProps) => {
	return (
		<div className={`flex justify-between py-6 ${className}`}>
			<p className="text-2xl font-bold text-dark-grey-500">{children}</p>
			<div className="cursor-pointer" onClick={onClose}>
				<CloseIcon className="stroke-[#A3AED0]" />
			</div>
		</div>
	);
};

export default ModalHeader;
