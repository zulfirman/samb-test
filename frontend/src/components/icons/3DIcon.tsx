"use client";

import { IconProps } from "@/types/common";

const _3DIcon = ({ active }: IconProps) => {
	const activeClass = active
		? "fill-primary-500"
		: "fill-blue-grey-900 group-hover/item:fill-primary-500";

	return (
		<svg
			className={`transition-all ${activeClass}`}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H14C14.7957 3 15.5587 3.31607 16.1213 3.87868C16.6839 4.44129 17 5.20435 17 6V12.5H16.29L14.862 10H16V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V10H5.138L3.71 12.5H3V6ZM3 14V13.5H7.337L6.52 16.36L6.328 17H6C5.20435 17 4.44129 16.6839 3.87868 16.1213C3.31607 15.5587 3 14.7957 3 14ZM7.48 16.637L8.377 13.5H11.623L12.518 16.634L12.618 17H7.372L7.479 16.644L7.48 16.637ZM8.664 12.5H11.338L10.624 10H9.377L8.664 12.5ZM13.482 16.363L12.664 13.5H17V14C17 14.7957 16.6839 15.5587 16.1213 16.1213C15.5587 16.6839 14.7957 17 14 17H13.655L13.482 16.368L13.481 16.363H13.482ZM12.377 12.5H15.138L13.71 10H11.663L12.377 12.5ZM4.862 12.5H7.622L8.337 10H6.29L4.862 12.5Z" />
		</svg>
	);
};

export default _3DIcon;
