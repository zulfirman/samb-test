"use client";

import HamburgerIcon from "@/components/icons/HamburgerIcon";
import { useSidebar } from "@/providers/SidebarContext";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";

type HeaderProps = {
	title: string;
};

const Header = ({ title }: HeaderProps) => {
	const { toggleOpen } = useSidebar();
	const router = useRouter();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = () => {
		// Add your logout logic here
		localStorage.removeItem('profile');
		localStorage.removeItem('tokens');
		router.push("/login");
		console.log('User logged out');
	};

	return (
		<header
			className={`flex h-header-height w-full z-0 sm:z-[1] bg-white shadow-[0px_1px_8px_0px_rgba(32,41,57,0.04)]`}
		>
			<div className="h-header-height w-header-height pl-8 flex items-center">
				<HamburgerIcon onClick={toggleOpen} />
			</div>
			<div className="flex flex-1 pr-9 items-center justify-between">
				<p className="font-bold text-2xl">{title}</p>
				<div className="flex items-center relative">
					<Image
						src="/images/user.png"
						alt="user"
						width={44}
						height={44}
						className="mr-4"
					/>
					<div className="flex flex-col mr-1 w-[140px]">
						<p className="font-bold text-dark-grey-500">Admin</p>
						<p className="text-sm text-blue-grey-900">Super Admin</p>
					</div>
					<div
						className="w-6 h-6 bg-blue-grey-100 flex items-center justify-center rounded overflow-hidden cursor-pointer transition-colors duration-300 hover:bg-blue-grey-300"
						onClick={toggleDropdown}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 6L8 10L12 6"
								stroke="#A3AED0"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					{/* Dropdown Menu */}
					{isDropdownOpen && (
						<div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
							<div
								className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-grey-100 cursor-pointer"
								onClick={handleLogout}
							>
								Logout
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
