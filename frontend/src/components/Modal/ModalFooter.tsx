"use client";

type ModalFooterProps = {
	children: React.ReactNode;
	className?: HTMLDivElement["className"];
	flex?: "start" | "center" | "end";
};

const flexClass = {
	start: "flex justify-start items-center",
	center: "flex justify-center items-center",
	end: "flex justify-end items-center",
};

const ModalFooter = ({
	children,
	className,
	flex = "start",
}: ModalFooterProps) => {
	return (
		<div className={`${flexClass[flex]} py-6 ${className}`}>{children}</div>
	);
};

export default ModalFooter;
