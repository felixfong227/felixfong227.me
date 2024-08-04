import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'krona-one': ['Krona One', ...defaultTheme.fontFamily.sans],
                'oswald': ['Oswald Variable', ...defaultTheme.fontFamily.sans],
                'oxygen': ['Oxygen', ...defaultTheme.fontFamily.sans],
            },
            letterSpacing: {
                'main-name': '1rem',
            },
            rotate: {
                'inverted-90': '-90deg',
            },
            colors: {
                'grey': '#CCCCCC',
            }
        },
    },
    plugins: [],
}
