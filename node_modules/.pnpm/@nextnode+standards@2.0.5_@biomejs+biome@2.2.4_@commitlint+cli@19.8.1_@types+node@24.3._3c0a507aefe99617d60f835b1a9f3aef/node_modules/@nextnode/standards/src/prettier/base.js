/**
 * Base Prettier configuration for NextNode projects
 * @type {import("prettier").Config}
 */
export default {
	useTabs: true,
	tabWidth: 4,
	endOfLine: 'lf',
	printWidth: 80,
	jsxSingleQuote: false,
	trailingComma: 'all',
	semi: false,
	arrowParens: 'avoid',
	bracketSpacing: true,
	bracketSameLine: false,
	singleQuote: true,
	plugins: ['prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: ['*.json', '*.jsonc'],
			options: {
				useTabs: true,
				tabWidth: 4,
				trailingComma: 'none',
			},
		},
	],
}
