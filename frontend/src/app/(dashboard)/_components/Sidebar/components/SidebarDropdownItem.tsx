"use client";

import { useSidebar } from "@/providers/SidebarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SidebarDropdownItemProps = {
    name: string;
    title: string;
    href: string;
    active: boolean;
}

const SidebarDropdownItem = ({ href, title, active, name }: SidebarDropdownItemProps) => {
    const router = useRouter();
    const { isOpen, setActiveItem } = useSidebar();

    const barActiveClass = active ? "opacity-100" : "opacity-0";

    const textItemActiveClass = active
		? "font-bold text-black"
		: "font-medium text-blue-grey-900 group-hover/child:text-black";

    const itemOpenClass = isOpen
		? "py-2 pl-10 xl:pl-1"
		: "py-2 pl-1 xl:pl-10";

    const onClick: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
        setActiveItem(name);
        router.push(e.currentTarget.href);
    };

    return (
        <Link href={href} className={`flex items-center ${itemOpenClass} transition-all duration-300 group/child`} onClick={onClick}>
            <span className={`text-sm ${textItemActiveClass}`}>{title}</span>
            <div className={`absolute right-0 w-1 h-[32px] rounded-lg bg-primary-500 transition-all group-hover/child:opacity-100 ${barActiveClass}`}/>
        </Link>
    )
}

export default SidebarDropdownItem;