/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					accent: '#dd9933',
					dark: '#926118',
					light: '#ecc58a',
					lighter: '#f8ead5',
					sub: '#cd162c',
					text: '#333333',
					muted: '#666666',
					surface: '#f7f7f7',
					border: '#eeeeee',
				},
			},
		},
	},
	plugins: [],
}

