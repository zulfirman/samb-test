"use client";

import { useSidebar } from "@/providers/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SidebarLogo = () => {
	const router = useRouter()
	const { isOpen, setActiveItem } = useSidebar();

	const logoOpenClass = isOpen
		? "translate-y-0 opacity-100 delay-[0.31s,s] xl:-translate-y-14 xl:opacity-0 xl:delay-[0s,.01s]"
		: "-translate-y-14 opacity-0 delay-[0s,.01s] xl:translate-y-0 xl:opacity-100 xl:delay-[.31s,0.3s]";
	
	const onClick: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
		setActiveItem("goods-recei[t");
		router.push(e.currentTarget.href);
	};

	return (
		<div className="flex h-header-height justify-center items-center border-b-[1px] border-[rgba(244, 247, 254, 1)]">
			<Link
				href="/"
				className={`transition-[transform,opacity] duration-[.001s,.3s] ${logoOpenClass}`}
				onClick={onClick}
			>
				<div className="relative h-6 w-40">
					{/*<Image
						src="/images/logo.png"
						fill
						objectFit="contain"
						alt="logo"
					/>*/}
				</div>
			</Link>
		</div>
	);
};

export default SidebarLogo;
