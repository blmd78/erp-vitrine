export const common = {
	navigation: {
		home: 'Home',
		about: 'About',
		services: 'Services',
		portfolio: 'Portfolio',
		contact: 'Contact',
		pricing: 'Pricing',
	},
	ui: {
		toggleTheme: 'Toggle theme',
		selectLanguage: 'Select language',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		scrollToDiscover: 'Scroll to discover more',
		scrollToDiscoverAria: 'Discover more',
		theme: 'Theme',
		language: 'Language',
		illustrationNotFound: 'Illustration not found',
	},
	cal: {
		scheduleButton: '📅 Schedule a meeting',
		scheduleMeeting: 'Schedule a call',
		bookConsultation: 'Book consultation',
		letsChat: "Let's talk about your project",
		freeConsultation: 'Free consultation',
		loading: 'Loading calendar...',
		opensInModal: 'Opens calendar booking modal',
		error: 'Unable to load calendar, opening in new tab',
	},
	stepCard: {
		step: 'Step',
		clickToSeeMore: 'Click for more',
	},
	languages: {
		en: 'EN',
		fr: 'FR',
	},
	legal: {
		lastUpdated: 'Last updated',
	},
	meta: {
		defaultDescription:
			'Web agency in Paris specialized in custom website creation. Free quote, personalized support. Web development expert Île-de-France.',
		homepage: {
			title: 'NextNode | Web Agency Paris - Website Creation Île-de-France',
			description:
				'Web agency in Paris specialized in custom website creation, web development and digital solutions. Free quote in 48h. Île-de-France expertise.',
		},
		pricing: {
			title: 'Website Pricing Paris | Free Quote - NextNode',
			description:
				'Discover our transparent pricing for your website creation in Paris. Packages adapted for SMEs, personalized quote within 48h. Île-de-France web agency.',
		},
		services: {
			title: 'Web Services Paris | Development, Design, SEO - NextNode',
			description:
				'Digital agency Paris: showcase website, e-commerce, web application creation. Custom solutions for Île-de-France businesses. Recognized technical expertise.',
		},
	},
	// Exemples pour tester le nouveau système i18n
	examples: {
		messages: [
			'Welcome {name}!',
			'Your account was created on {date}',
			'You have {count} new notifications',
		],
		interpolation: {
			greeting: 'Hello {name}, welcome to {siteName}!',
			datetime: 'Today is {date} and it is {time}',
			plural: 'You have {count} {count, plural, =0 {items} one {item} other {items}}',
		},
		nested: {
			level1: {
				level2: {
					value: 'Deep nested value for testing',
				},
			},
		},
	},
} as const
