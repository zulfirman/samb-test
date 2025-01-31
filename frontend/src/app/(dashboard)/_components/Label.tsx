"use client";

import CloseIcon from "@/components/icons/CloseIcon";

type LabelProps = {
	className?: HTMLDivElement["className"];
	title: string;
	onClick?: () => void;
};

const Label = ({ title, className, onClick }: LabelProps) => {
	return (
		<div
			className={`flex items-center select-none px-3 py-1 rounded-lg bg-[rgba(0,148,255,.1)] cursor-pointer font-[#4D4D4D] text-[14px] transition-colors hover:bg-[rgba(0,148,255,.2)] ${className}`}
			onClick={onClick}
		>
			{title}
			<CloseIcon className="stroke-[#4D4D4D] w-[18px] h-[18px] ml-1" />
		</div>
	);
};

export default Label;
