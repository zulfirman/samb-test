"use client";

type HamburgerIconProps = {
	onClick: () => void;
};

const HamburgerIcon = ({ onClick }: HamburgerIconProps) => {
	return (
		<svg
			className="cursor-pointer"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
		>
			<path
				d="M5 17H19M5 12H19M5 7H19"
				stroke="#A3AED0"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default HamburgerIcon;
