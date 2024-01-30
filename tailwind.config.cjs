const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons");
const accent = "pink";
const linkColor = "sky";

/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [
        require("@catppuccin/tailwindcss")({
            prefix: "cat",
            defaultFlavour: "frappe",
        }),
        iconsPlugin({
            collections: getIconCollections(["ri", "ep"]),
        }),
        require("@tailwindcss/typography"),
    ],
}
