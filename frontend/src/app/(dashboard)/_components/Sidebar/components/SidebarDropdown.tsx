"use client";

import { useSidebar } from "@/providers/SidebarContext";
import { IconProps } from "@/types/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import SidebarDropdownItem from './SidebarDropdownItem';

type SidebarDropdownProps = {
	name: string;
	items: {
        name: string;
        href: string;
		title: string;
    }[]
	title: string;
	Icon: (props: IconProps) => JSX.Element;
	active: boolean;
};

const SidebarDropdown  = ({ Icon, active, items, name, title }: SidebarDropdownProps) =>  {
	const { isOpen, activeItem, setActiveItem } = useSidebar();
    const [open, setOpen] = useState(active);

    const linkOpenClass = isOpen
		? "delay-[0.3s] opacity-100"
		: "delay-[0s] opacity-0 sm:opacity-100";

	const textItemActiveClass = open
		? "font-bold text-dark-grey-500"
		: "font-medium text-blue-grey-900 group-hover/item:text-dark-grey-500";

	const textItemOpenClass = isOpen
		? "delay-[0.3s,0.31s,0.3s] ml-3 max-w-full opacity-100 xl:delay-[0s,0s,0s] xl:max-w-0 xl:ml-0 xl:opacity-0"
		: "delay-[0s,0s,0s] max-w-0 ml-0 opacity-0 xl:delay-[0.3s,0s,0.3s] xl:max-w-full xl:ml-3 xl:opacity-100";

    const dropdownItemActiveClass = open 
        ? `max-h-[500px]`
        : "max-h-[0px]"

    const onClick = () => {
        setOpen(!open)
    }

	useEffect(() => {
		setOpen(active)
	}, [active])

    return (
        <li className="w-full group/item">
			<div
				onClick={onClick}
				className={`w-full h-12 flex items-center px-8 sm:px-8 transition-[opacity] cursor-pointer duration-300 ${linkOpenClass}`}
			>
				<Icon active={open} />
				<span
					className={`text-[16px] overflow-hidden transition-[max-width,opacity,margin] duration-[0s,0.3s,0s] ${textItemActiveClass} ${textItemOpenClass}`}
				>
					{title}
				</span>
				{/* <div className={`absolute right-0 w-1 h-9 rounded-lg bg-primary-500 transition-all ${barActiveClass}`} /> */}
			</div>
            <div className={`transition-all duration-300 overflow-hidden bg-[#ece8e8] shadow-inner ${dropdownItemActiveClass}`}>
				{items.map((route) => (
					<SidebarDropdownItem
						key={route.name} 
						active={route.name == activeItem}
						href={route.href}
						title={route.title}
						name={route.name}
					/>
				))}
            </div>
		</li>
    )
}

export default SidebarDropdown
