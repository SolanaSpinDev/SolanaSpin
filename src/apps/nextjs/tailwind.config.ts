import {nextui} from '@nextui-org/theme';
import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js"
    ],
    theme: {
        extend: {
            backgroundImage: {
                'video-container-bg': "url('/images/wood/default-bg-start.webp')",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                spinSlowFastSlow: {
                    '0%': {transform: 'rotate(0deg)', animationTimingFunction: 'ease-in'},
                    '50%': {transform: 'rotate(1000deg)', animationTimingFunction: 'linear'},
                    '100%': {transform: 'rotate(2000deg)', animationTimingFunction: 'ease-out'},
                },
                zoomInOut: {
                    '0%, 100%': {transform: 'scale(1)'},
                    '75%': {transform: 'scale(0.95)'},
                    '50%': {transform: 'scale(1.05)'},
                },
                glow: {
                    '0%, 100%': {
                        boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)', // Light glow at the edges
                    },
                    '50%': {
                        boxShadow: '0 0 20px rgba(255, 255, 255, 1)', // Bright glow
                    },
                }
            },
            animation: {
                spinSlowFastSlow: 'spinSlowFastSlow 5s infinite',
                'zoom-in-out': 'zoomInOut 5s ease-in-out infinite',
                glow: 'glow 1.5s ease-in-out infinite',
            },
            height: {
                'screen-minus-80': 'calc(100vh - 80px)',
            },
        },
    },
    plugins: [nextui()],
};
export default config;
