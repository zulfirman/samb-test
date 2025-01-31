"use client";

type CloseIconProps = {
	className?: HTMLDivElement["className"];
};

const CloseIcon = ({
	className = "fill-dark-grey-500 text-dark-grey-500",
}: CloseIconProps) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M12 12L7 7M12 12L17 17M12 12L17 7M12 12L7 17"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CloseIcon;
