import type { StorybookConfig } from '@storybook/sveltekit';
import { defineConfig, mergeConfig } from 'vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-svelte-csf',
		'@chromatic-com/storybook',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-vitest'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	viteFinal: async (config) => {
		return mergeConfig(
			config,
			defineConfig({
				server: {
					fs: {
						allow: ['styled-system']
					}
				}
			})
		);
	}
};
export default config;
