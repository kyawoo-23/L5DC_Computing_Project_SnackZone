import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#8f3e00",
              foreground: "#000000",
            },
            focus: "#8f3e00",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#FFED44",
              foreground: "#000000",
            },
            focus: "#FFED44",
          },
        },
      },
    }),
  ],
};
export default config;
