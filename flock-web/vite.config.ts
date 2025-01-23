import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [sveltekit()],
    server: {
      port: 3000,
      host: true,
      allowedHosts: [env.VITE_PUBLIC_APP_DOMAIN]
    },
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}']
    }
  };
});
