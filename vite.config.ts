import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { nitro } from 'nitro/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// Vercel sets VERCEL=1 during its builds; Nitro then emits .vercel/output.
const onVercel = !!process.env.VERCEL

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tanstackStart(),
    // Deploy adapters are build-only: in dev, Netlify's static-file emulation
    // serves src/styles.css raw, bypassing Tailwind.
    command === 'build' && (onVercel ? nitro() : netlify()),
    react(),
    tsconfigPaths(),
  ],
}))
