import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#6366f1',      // indigo-500
        'primary-dark': '#4f46e5', // indigo-600
        page: '#f9fafb',         // gray-50
        accent: {
          DEFAULT: '#8b5cf6',    // violet-500
          dark: '#7c3aed',       // violet-600
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f3f4f6',  // gray-100
          hover: '#f9fafb',      // gray-50
        },
        text: {
          primary: '#111827',    // gray-900
          secondary: '#374151',  // gray-700
          tertiary: '#6b7280',   // gray-500
          muted: '#9ca3af',      // gray-400
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
