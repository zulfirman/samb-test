import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"primary-500": "var(--color-primary-500)",
				"primary-700": "var(--color-primary-700)",
				"primary-900": "var(--color-primary-900)",
				"dark-grey-500": "var(--color-dark-grey-500)",
				"dark-grey-900": "var(--color-dark-grey-900)",
				"blue-grey-50": "var(--color-blue-grey-50)",
				"blue-grey-100": "var(--color-blue-grey-100)",
				"blue-grey-300": "var(--color-blue-grey-300)",
				"blue-grey-500": "var(--color-blue-grey-500)",
				"blue-grey-700": "var(--color-blue-grey-700)",
				"blue-grey-900": "var(--color-blue-grey-900)"
			},
			spacing: {
				"sidebar-xl": "var(--sidebar-xl)",
				"sidebar-sm": "var(--sidebar-sm)",
				"header-height": "var(--header-height)",
			},
			screens: {
				dpr: {
					raw: "(-webkit-device-pixel-ratio: 1.25)"
				}
			}
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
}
export default config
