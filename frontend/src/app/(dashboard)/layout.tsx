"use client";

import { useIsLoaded } from "@/hooks/useIsLoaded";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const loaded = useIsLoaded("/login");

	if (!loaded) {
		return;
	}

	return (
		<div className="flex relative">
			<Sidebar asPlaceholder />
			{children}
			<Sidebar />
		</div>
	);
}
