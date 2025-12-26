/**
 * Tailwind CSS v4 - Configuração
 * 
 * No Tailwind v4, a configuração é feita via CSS usando @theme.
 * Este arquivo é mantido apenas para compatibilidade ou se você
 * preferir usar @config no CSS.
 * 
 * A configuração principal está em src/index.css usando @theme
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'class' - Configurado via CSS no Tailwind v4
}

