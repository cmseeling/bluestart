import '../src/app.css';
import type { Preview, SvelteRenderer } from '@storybook/svelte';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		withThemeByClassName<SvelteRenderer>({
			themes: {
				mocha: 'mocha',
				latte: 'latte',
				frappe: 'frappe',
				macchiato: 'macchiato'
			},
			defaultTheme: 'latte'
		})
	]
};

export default preview;
