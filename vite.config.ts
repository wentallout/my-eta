import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

export default defineConfig({
	plugins: [sveltekit(), Icons({ compiler: 'svelte' })],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>= 0.25%'))
		}
	},
	build: {
		cssMinify: 'lightningcss'
	}
});
