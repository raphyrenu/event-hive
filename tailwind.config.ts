import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
            background: "#000000",
            foreground: "#ffffff",
            primary: "#7848F4"
          },
        fontFamily: {
            bayon: ['Bayon', 'sans-serif']
          },
        
    },
  },
  plugins: [],
};
export default config;
