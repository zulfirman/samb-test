"use client";

type ModalBodyProps = {
	children: React.ReactNode;
	className?: HTMLDivElement["className"];
};

const ModalBody = ({ children, className }: ModalBodyProps) => {
	return (
		<div className={`flex flex-1 flex-col ${className}`}>{children}</div>
	);
};

export default ModalBody;
