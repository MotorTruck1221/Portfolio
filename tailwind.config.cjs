const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
module.exports = {
    plugins: [
        require("@catppuccin/tailwindcss")({
            prefix: "cat",
            defaultFlavour: "frappe",
        }),
        iconsPlugin({
            collections: getIconCollections(["ri"]),
        }),
  ],
};
