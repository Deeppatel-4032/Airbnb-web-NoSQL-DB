module.exports = {
  theme: {
    extend: {
      aspectRatio: {
        "w-16": 16,
        "h-12": 12,
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      height: {
        "[500px]": "500px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};
