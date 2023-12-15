/** @type {import('tailwindcss').Config} */
module.exports = {
    // purge: [],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: {
                "2xs": ".65rem",
            },
            transitionProperty: {
                height: "height",
            },
            keyframes: {
                loading: {
                    "0%": { left: "0px" },
                    "100%": { left: "320px" },
                },
            },
            animation: {
                dot1: "loading 2s infinite",
                dot2: "loading 2s 0.5s infinite",
                dot3: "loading 2s 1s infinite",
            },
        },
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
