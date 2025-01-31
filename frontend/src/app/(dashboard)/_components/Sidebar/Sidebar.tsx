"use client";

import { useSidebar } from "@/providers/SidebarContext";
import { sidebarItems } from "../../_configs/sidebar-items";
import { SidebarBackdrop, SidebarItem, SidebarLogo } from "./components";
import SidebarDropdown from './components/SidebarDropdown';
import ListProductIcon from "@/components/icons/ListProductIcon";

type SidebarProps = {
	asPlaceholder?: boolean;
};

const Sidebar = ({ asPlaceholder }: SidebarProps) => {
	const { isOpen, activeItem, toggleOpen } = useSidebar();

	if (asPlaceholder) {
		const placeholderActiveClass = isOpen
			? "sm:w-sidebar-xl xl:w-sidebar-sm"
			: "sm:w-sidebar-sm xl:w-sidebar-xl";

		return (
			<div
				id="sidebar-placeholder"
				className={`sidebar w-0 h-screen transition-all duration-300 ${placeholderActiveClass}`}
			/>
		);
	}

	const sidebarActiveClass = isOpen
		? "w-sidebar-xl xl:w-sidebar-sm"
		: "w-0 sm:w-sidebar-sm xl:w-sidebar-xl";

	return (
		<>
			<SidebarBackdrop isOpen={isOpen} toggleOpen={toggleOpen} />

			<nav
				className={`sidebar group/sidebar fixed top-0 left-0 h-screen dpr:h-[125vh] bg-white transition-all duration-300 overflow-hidden ${sidebarActiveClass}`}
			>
				<SidebarLogo />
				<ul className="mt-8">
					{sidebarItems.map((item) => {
						if (item.items) {
							const routeItems = item.items.map(route => route.name);

							return (
								<SidebarDropdown
									key={item.name}
									Icon={item.Icon}
									active={routeItems.includes(activeItem)}
									items={item.items}
									name={item.name}
									title={item.title}
								/>
							)
						}

						return (
							<SidebarItem
								key={item.name}
								name={item.name}
								href={item.href}
								title={item.title}
								Icon={item.Icon}
								active={activeItem === item.name}
							/>
						);
					})}
				</ul>
			</nav>
		</>
	);
};

export default Sidebar;
