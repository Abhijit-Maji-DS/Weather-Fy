import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()]

  try {
    const m = await import('./.vite-source-tags.js')
    plugins.push(m.sourceTags())
  } catch (e) {
    // optional: handle error or ignore
  }

  return {
    plugins,
  }
})