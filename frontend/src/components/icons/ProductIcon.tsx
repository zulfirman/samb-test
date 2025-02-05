"use client";

import { IconProps } from "@/types/common";

const ProductIcon = ({ active }: IconProps) => {
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
			<path d="M9.375 1.17188L17.5 5.23438V15.3906L9.375 19.4434L1.25 15.3906V5.23438L9.375 1.17188ZM15.4785 5.625L9.375 2.57812L7.02148 3.75L13.0859 6.81641L15.4785 5.625ZM9.375 8.67188L11.6992 7.51953L5.625 4.45312L3.27148 5.625L9.375 8.67188ZM2.5 6.64062V14.6094L8.75 17.7344V9.76562L2.5 6.64062ZM10 17.7344L16.25 14.6094V6.64062L10 9.76562V17.7344Z" />
		</svg>
	);
};

export default ProductIcon;
