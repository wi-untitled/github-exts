/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        fontSize: {
            "1/5xs": ".65rem",
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const utility = {
                ".no-scrollbar::-webkit-scrollbar": {
                    display: "none",
                },
                ".no-scrollbar": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                },
            };

            addUtilities(utility);
        },
    ],
};
