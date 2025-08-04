import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, SvelteRenderer } from '@storybook/sveltekit';
import '../src/app.css';

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
