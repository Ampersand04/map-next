import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { colors as COLORS } from './src/config/color.constants';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            'max-xs': { max: '480px' },
            // md: { max: '992px' },
            'max-sm': { max: '768px' },
            'max-md': { max: '992px' },
            'max-lg': { max: '1280px' },
            'max-xl': { max: '1399px' },
        },
        extend: {
            backgroundImage: {
                'blue-gradient':
                    'radial-gradient(circle, rgba(90,197,243,0.8) 0%, rgba(52,55,250,0) 50%)',
            },
            colors: COLORS,
        },
    },
    plugins: [
        plugin(({ addUtilities }) => {
            const newUtilities: Record<string, Record<string, string>> = {
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            };
            addUtilities(newUtilities);
        }),
    ],
};

export default config;
