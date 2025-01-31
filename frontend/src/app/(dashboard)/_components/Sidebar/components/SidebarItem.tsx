"use client";

import { useSidebar } from "@/providers/SidebarContext";
import { IconProps } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SidebarItemProps = {
	name: string;
	href: string;
	title: string;
	Icon?: (props: IconProps) => JSX.Element;
	active: boolean;
};

const SidebarItem = ({ active, href, Icon, name, title }: SidebarItemProps) => {
	const router = useRouter();
	const { isOpen, setActiveItem } = useSidebar();

	const linkOpenClass = isOpen
		? "delay-[0.3s] opacity-100"
		: "delay-[0s] opacity-0 sm:opacity-100";

	const textItemActiveClass = active
		? "font-bold text-dark-grey-500"
		: "font-medium text-blue-grey-900 group-hover/item:text-dark-grey-500";

	const textItemOpenClass = isOpen
		? "delay-[0.3s,0.31s,0.3s] ml-3 max-w-full opacity-100 xl:delay-[0s,0s,0s] xl:max-w-0 xl:ml-0 xl:opacity-0"
		: "delay-[0s,0s,0s] max-w-0 ml-0 opacity-0 xl:delay-[0.3s,0s,0.3s] xl:max-w-full xl:ml-3 xl:opacity-100";

	const barActiveClass = active ? "opacity-100" : "opacity-0";

	const onClick: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
		setActiveItem(name);
		router.push(e.currentTarget.href);
	};

	return (
		<li className="w-full group/item">
			<Link
				onClick={onClick}
				className={`w-full h-12 flex items-center px-8 sm:px-8 transition-[opacity] duration-300 ${linkOpenClass}`}
				href={href}
			>
				{Icon ? <Icon active={active} /> : <div />}
				<span
					className={`text-[16px] overflow-hidden transition-[max-width,opacity,margin] duration-[0s,0.3s,0s] ${textItemActiveClass} ${textItemOpenClass}`}
				>
					{title}
				</span>
				<div
					className={`absolute right-0 w-1 h-9 rounded-lg bg-primary-500 transition-all ${barActiveClass}`}
				/>
			</Link>
		</li>
	);
};

export default SidebarItem;
