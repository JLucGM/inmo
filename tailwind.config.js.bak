import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import flowbite from "flowbite-react/tailwind";


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        flowbite.content(),
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                
            },
            height: {
                'screen-[-175]': 'calc(100vh - 175px)',
              },
        },
    },

    plugins: [
        forms,
        flowbite.plugin(),
    ],
};
