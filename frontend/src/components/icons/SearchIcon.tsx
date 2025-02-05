"use client";

type SearchIconProps = {
	className?: HTMLDivElement["className"];
};

const SearchIcon = ({
	className = "fill-dark-grey-500 text-dark-grey-500",
}: SearchIconProps) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M16.6666 16.6667L13.2916 13.2917M13.2916 13.2917C13.8333 12.75 14.263 12.1069 14.5562 11.3991C14.8494 10.6913 15.0003 9.93275 15.0003 9.16667C15.0003 8.40059 14.8494 7.642 14.5562 6.93424C14.263 6.22647 13.8333 5.58337 13.2916 5.04167C12.7499 4.49997 12.1068 4.07026 11.3991 3.7771C10.6913 3.48393 9.93272 3.33304 9.16664 3.33304C8.40056 3.33304 7.64197 3.48393 6.9342 3.7771C6.22644 4.07026 5.58334 4.49997 5.04164 5.04167C3.94762 6.13569 3.33301 7.61949 3.33301 9.16667C3.33301 10.7138 3.94762 12.1977 5.04164 13.2917C6.13566 14.3857 7.61946 15.0003 9.16664 15.0003C10.7138 15.0003 12.1976 14.3857 13.2916 13.2917Z"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default SearchIcon;
