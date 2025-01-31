"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

type TopLoaderProviderType = {
	children: React.ReactNode;
};

const TopLoaderProvider = ({ children }: TopLoaderProviderType) => {
	return (
		<>
			{children}
			<ProgressBar
				color="var(--color-primary-500)"
				options={{ showSpinner: false }}
			/>
		</>
	);
};

export default TopLoaderProvider;
