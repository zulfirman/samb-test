"use client";

type SortIconProps = {
	className?: HTMLDivElement["className"];
};

const SortIcon = ({
	className = "fill-dark-grey-500 text-dark-grey-500",
}: SortIconProps) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path d="M9 8.38542H15V9.73958H9V8.38542ZM9 11.0938H13.6667V12.4479H9V11.0938ZM9 5.67708H16.3333V7.03125H9V5.67708ZM9 13.8021H12.3333V15.1562H9V13.8021ZM5 15.8333H6.33333V7.70833H8.33333L5.66667 5L3 7.70833H5V15.8333Z" />
		</svg>
	);
};

export default SortIcon;
