/**
 * Centralized pricing configuration
 * Modify values in this file to update all prices across the site
 */

export const PRICING_CONFIG = {
	// Monthly base price for hosting and maintenance
	monthly: {
		base: 25,
	},

	// Development plan prices
	plans: {
		starter: {
			min: 500,
			max: 800,
		},
		business: {
			min: 1500,
			max: 3500,
		},
	},

	// Support tier prices
	support: {
		priority: 75,
		urgent: 200,
	},

	// Professional modal prices (budget ranges)
	professional: {
		ranges: [
			{ min: 1500, max: 3500 },
			{ min: 3500, max: 7500 },
			{ min: 7500, max: 15000 },
			{ min: 15000, max: null }, // 15000+
		],
		enterprise: {
			ranges: [
				{ min: 15000, max: 30000 },
				{ min: 30000, max: 50000 },
				{ min: 50000, max: 100000 },
				{ min: 100000, max: null }, // 100000+
			],
		},
	},
} as const
