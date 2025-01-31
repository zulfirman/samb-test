"use client";

import { useSidebar } from "@/providers/SidebarContext";
import Header from "./Header";

type ContainerProps = {
	children: React.ReactNode;
	title: string;
	className?: HTMLDivElement["className"];
};

const Container = ({ children, title, className }: ContainerProps) => {
	const { isOpen } = useSidebar();

	const containerActiveClass = isOpen
		? "w-screen sm:w-[calc(100vw-var(--sidebar-xl))] xl:w-[calc(100vw-var(--sidebar-sm))]"
		: "w-screen sm:w-[calc(100vw-var(--sidebar-sm))] xl:w-[calc(100vw-var(--sidebar-xl))]";

	return (
		<>
			<main className="flex flex-col flex-1 relative overflow-x-hidden">
				<Header title={title} />
				<div
					id="container"
					className={`p-8 transition-all overflow-x-auto ${
						title == "asaa"
							? `h-[calc(100vh-var(--header-height))] dpr:h-[calc(125vh-var(--header-height))] dpr:w-[100%] ${containerActiveClass}`
							: "w-full"
					} ${className}`}
				>
					{children}
				</div>
			</main>
		</>
	);
};

export default Container;
