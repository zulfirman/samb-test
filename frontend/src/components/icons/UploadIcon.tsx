"use client";

type UploadIconProps = {
	className?: HTMLDivElement["className"];
};

const UploadIcon = ({
	className = "fill-dark-grey-500 text-dark-grey-500",
}: UploadIconProps) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path d="M9.16658 13.3333V6.54167L6.99992 8.70834L5.83325 7.5L9.99992 3.33334L14.1666 7.5L12.9999 8.70834L10.8333 6.54167V13.3333H9.16658ZM4.99992 16.6667C4.54159 16.6667 4.14936 16.5036 3.82325 16.1775C3.49714 15.8514 3.33381 15.4589 3.33325 15V12.5H4.99992V15H14.9999V12.5H16.6666V15C16.6666 15.4583 16.5035 15.8508 16.1774 16.1775C15.8513 16.5042 15.4588 16.6672 14.9999 16.6667H4.99992Z" />
		</svg>
	);
};

export default UploadIcon;
