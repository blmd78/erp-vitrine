/**
 * Prettier configuration for NextNode Astro projects
 * Extends the base config with Astro-specific settings
 * @type {import("prettier").Config}
 */
import baseConfig from './base.js'

export default {
	...baseConfig,
	plugins: [
		'prettier-plugin-astro',
		'prettier-plugin-tailwindcss', // Tailwind plugin from base
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}
