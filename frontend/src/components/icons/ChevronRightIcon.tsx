"use client";

type ChevronRightIconProps = {
	className?: HTMLDivElement["className"];
};

const ChevronRightIcon = ({
	className = "fill-dark-grey-500 text-dark-grey-500",
}: ChevronRightIconProps) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path d="M15.78 12.72C15.9207 12.5795 15.9998 12.3888 16 12.19V11.81C15.9977 11.6116 15.9189 11.4217 15.78 11.28L10.64 6.14997C10.5461 6.05532 10.4183 6.00208 10.285 6.00208C10.1517 6.00208 10.0239 6.05532 9.93 6.14997L9.22 6.85997C9.12594 6.95214 9.07293 7.07828 9.07293 7.20997C9.07293 7.34166 9.12594 7.46781 9.22 7.55997L13.67 12L9.22 16.44C9.12534 16.5339 9.0721 16.6617 9.0721 16.795C9.0721 16.9283 9.12534 17.0561 9.22 17.15L9.93 17.85C10.0239 17.9446 10.1517 17.9979 10.285 17.9979C10.4183 17.9979 10.5461 17.9446 10.64 17.85L15.78 12.72Z" />
		</svg>
	);
};

export default ChevronRightIcon;
