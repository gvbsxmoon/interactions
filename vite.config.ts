import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@primitives': path.resolve(__dirname, './src/ui/primitives'),
			'@compounds': path.resolve(__dirname, './src/ui/compounds'),
		},
	},
	plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
