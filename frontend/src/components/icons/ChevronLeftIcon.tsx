"use client";

type ChevronLeftIconProps = {
	className?: HTMLDivElement["className"];
};

const ChevronLeftIcon = ({
	className = "fill-dark-grey-500 text-dark-grey-500",
}: ChevronLeftIconProps) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path d="M8.22 12.72C8.07931 12.5795 8.00018 12.3888 8 12.19V11.81C8.0023 11.6116 8.08112 11.4217 8.22 11.28L13.36 6.14997C13.4539 6.05532 13.5817 6.00208 13.715 6.00208C13.8483 6.00208 13.9761 6.05532 14.07 6.14997L14.78 6.85997C14.8741 6.95214 14.9271 7.07828 14.9271 7.20997C14.9271 7.34166 14.8741 7.46781 14.78 7.55997L10.33 12L14.78 16.44C14.8747 16.5339 14.9279 16.6617 14.9279 16.795C14.9279 16.9283 14.8747 17.0561 14.78 17.15L14.07 17.85C13.9761 17.9446 13.8483 17.9979 13.715 17.9979C13.5817 17.9979 13.4539 17.9446 13.36 17.85L8.22 12.72Z" />
		</svg>
	);
};

export default ChevronLeftIcon;
