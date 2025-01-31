"use client";

import { IconProps } from "@/types/common";

const StockProductIcon = ({ active }: IconProps) => {
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
			<path d="M11.692 1.84683C11.7817 1.75393 11.8314 1.62951 11.8302 1.50037C11.8291 1.37123 11.7773 1.24769 11.686 1.15637C11.5947 1.06505 11.4711 1.01325 11.342 1.01212C11.2128 1.011 11.0884 1.06065 10.9955 1.15037L9.86613 2.27978L8.73672 1.15037C8.69129 1.10333 8.63694 1.0658 8.57684 1.03999C8.51675 1.01417 8.45212 1.00059 8.38672 1.00002C8.32132 0.99945 8.25646 1.01191 8.19593 1.03668C8.1354 1.06144 8.0804 1.09802 8.03416 1.14426C7.98791 1.19051 7.95134 1.2455 7.92657 1.30604C7.90181 1.36657 7.88934 1.43143 7.88991 1.49683C7.89048 1.56223 7.90407 1.62686 7.92988 1.68695C7.9557 1.74704 7.99322 1.80139 8.04026 1.84683L9.16967 2.97623L8.04026 4.10564C7.95054 4.19854 7.90089 4.32296 7.90202 4.4521C7.90314 4.58124 7.95494 4.70478 8.04626 4.7961C8.13758 4.88742 8.26112 4.93922 8.39026 4.94035C8.51941 4.94147 8.64383 4.89182 8.73672 4.8021L9.86613 3.67269L10.9955 4.8021C11.088 4.89446 11.2133 4.94632 11.3439 4.94627C11.4746 4.94622 11.5999 4.89428 11.6922 4.80186C11.7846 4.70943 11.8365 4.58411 11.8364 4.45345C11.8364 4.32279 11.7844 4.19751 11.692 4.10515L10.5626 2.97623L11.692 1.84683ZM14.7665 13.9029C14.7869 13.9642 14.7951 14.0291 14.7905 14.0936C14.7859 14.1581 14.7686 14.2211 14.7397 14.279C14.7107 14.3369 14.6706 14.3884 14.6217 14.4308C14.5728 14.4732 14.5161 14.5055 14.4547 14.5259L12.2382 15.2648C12.1143 15.306 11.979 15.2964 11.8621 15.2379C11.7453 15.1794 11.6564 15.0769 11.6152 14.953C11.5739 14.829 11.5835 14.6937 11.642 14.5769C11.7005 14.46 11.803 14.3712 11.9269 14.3299L14.1434 13.5911C14.2048 13.5706 14.2696 13.5625 14.3341 13.5671C14.3987 13.5717 14.4617 13.5889 14.5195 13.6179C14.5774 13.6468 14.629 13.6869 14.6713 13.7358C14.7137 13.7847 14.746 13.8415 14.7665 13.9029Z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.33712 11.0781L2.9704 11.6224V15.7824C2.97041 15.8848 3.00233 15.9847 3.06175 16.0681C3.12116 16.1515 3.2051 16.2144 3.30189 16.2479L9.70104 18.4628C9.80217 18.4992 9.91247 18.5011 10.0148 18.4683L10.0217 18.4663L10.0291 18.4638L16.4302 16.2479C16.527 16.2144 16.6109 16.1515 16.6703 16.0681C16.7297 15.9847 16.7617 15.8848 16.7617 15.7824V11.6224L18.395 11.0781C18.4703 11.0531 18.5385 11.0102 18.5937 10.9531C18.6488 10.896 18.6894 10.8264 18.7119 10.7503C18.7344 10.6741 18.7382 10.5937 18.7228 10.5158C18.7075 10.4379 18.6736 10.3648 18.624 10.3028L16.6538 7.84011C16.5954 7.76736 16.5175 7.7127 16.4292 7.6825L10.0271 5.46604C9.92276 5.42994 9.80932 5.42994 9.70498 5.46604L3.30287 7.6825C3.21457 7.71268 3.13668 7.76734 3.07827 7.84011L1.10809 10.3028C1.05846 10.3648 1.02455 10.4379 1.00924 10.5158C0.993933 10.5937 0.997687 10.6741 1.02018 10.7503C1.04268 10.8264 1.08324 10.896 1.13843 10.9531C1.19362 11.0102 1.26178 11.0531 1.33712 11.0781ZM8.54553 13.1094L9.3735 11.9273V17.3073L3.95549 15.4317V11.9504L7.98649 13.2941C8.08719 13.3275 8.196 13.3276 8.29673 13.2942C8.39747 13.2609 8.48473 13.1963 8.54553 13.1094ZM4.96866 8.14795L9.86604 9.8433L14.7634 8.14795L9.86604 6.45261L4.96866 8.14795ZM11.1866 13.1099L10.3586 11.9268V17.3073L15.7766 15.4317V11.9504L11.7456 13.2941C11.6449 13.3275 11.5361 13.3276 11.4354 13.2942C11.3346 13.2609 11.2474 13.1958 11.1866 13.1089M3.63041 8.72719L2.31877 10.3669L5.03318 11.2717L7.94905 12.2435L9.08831 10.6166L9.02182 10.5934L3.63041 8.72719ZM17.4133 10.3669L16.1017 8.72669L10.6438 10.6166L11.783 12.2435L17.4133 10.3669Z"
			/>
		</svg>
	);
};

export default StockProductIcon;
