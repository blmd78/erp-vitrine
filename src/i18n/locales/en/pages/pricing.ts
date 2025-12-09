import { PRICING_CONFIG } from '@/lib/config/pricing/pricing-config'

export const pricing = {
	pageTitle: `Web Development from €${PRICING_CONFIG.monthly.base}/month | Nextnode`,
	sections: {
		plans: {
			title: 'Choose Your Plan',
			subtitle: 'Solutions tailored to every stage of your growth',
		},
		included: {
			title: 'Everything Included',
			subtitle: `In your €${PRICING_CONFIG.monthly.base} monthly plan`,
		},
		idealFor: 'IDEAL FOR',
		alreadyIncluded: '🎯 Already in your plan',
		examplesTitle: '💡 Real examples:',
		discoverPlans: 'Discover our plans',
	},
	hero: {
		title: 'TRANSPARENT',
		titleHighlight: 'PRICING',
		titleEnd: 'FOR YOUR SUCCESS',
		subtitle:
			'Custom development of real coded websites - Maximum freedom, unlimited functionality',
		description:
			'Unlike limiting no-code solutions, we develop real coded websites that you fully own. Complete freedom of functionality, guaranteed scalability, optimal performance. Transparent pricing with no hidden fees.',
		badge: '💡 Free consultation included',
		cta: {
			button: 'Free Consultation to Define Your Project',
			subtitle:
				"Let's discuss your needs to determine the ideal solution and provide you with an accurate quote",
		},
	},
	plans: {
		starter: {
			name: 'Starter',
			tagline: 'Real coded website, no limitations',
			price: `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.starter.min)} - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.starter.max)}`,
			recurring: `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.monthly.base)}/month`,
			badge: 'Perfect to start',
			description:
				'Your own website developed in modern code. Unlike no-code platforms, you have complete freedom to evolve and add any desired functionality.',
			features: [
				'Single landing page',
				'Mobile-responsive design',
				'Contact form integration',
				'SEO optimization',
				'SSL certificate',
				'Analytics setup',
				'24/7 infrastructure monitoring',
				'Monthly performance reports',
			],
			cta: 'Start Your Project',
			examples: [
				'Restaurant menu & contact',
				'Service company showcase',
				'Portfolio presentation',
			],
		},
		business: {
			name: 'Business',
			tagline: 'Complete coded web applications',
			price: `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.business.min)} - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.business.max)}`,
			recurring: `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.monthly.base)}/month`,
			badge: 'Complete & scalable',
			description:
				'Complete websites developed in code with all possible advanced features. Scalable architecture allowing integration of any solution or API.',
			features: [
				'Multi-page website (5-15 pages)',
				'Custom design & branding',
				'CMS integration',
				'E-commerce capabilities',
				'Advanced SEO',
				'Third-party integrations',
				'Performance optimization',
				'Priority support',
				'Monthly optimization reviews',
			],
			cta: 'Get a Quote',
			examples: [
				'Corporate website',
				'E-commerce store',
				'Service booking platform',
			],
		},
		enterprise: {
			name: 'Enterprise',
			tagline: 'Development without technical limits',
			price: 'Custom Quote',
			recurring: `€${PRICING_CONFIG.monthly.base}+/month`,
			badge: 'Advanced custom',
			description:
				'Complex web applications entirely developed in code. No technical limitations, advanced integrations, maximum performance. Your vision becomes reality without compromise.',
			features: [
				'Custom web applications',
				'Complex integrations',
				'Multi-language support',
				'Advanced security',
				'Scalable architecture',
				'Dedicated project manager',
				'SLA guarantees',
				'Custom hosting solutions',
				'24/7 priority support',
			],
			cta: 'Contact Us',
			examples: [
				'SaaS applications',
				'Enterprise portals',
				'Complex web platforms',
			],
		},
	},
	pricing: {
		title: "What's Included In Every Project",
		subtitle: 'A complete solution that gives you all the tools to succeed',
		development: {
			title: 'Custom Development',
			description:
				'Proprietary code developed specifically for your needs',
			details: [
				'Modern and scalable architecture (React, TypeScript, Node.js)',
				'Source code entirely yours - no external dependencies',
				'Responsive design adapted to all devices',
				'Advanced SEO optimizations built-in',
				'Optimal performance and fast loading times',
				'Enhanced security with best practices',
				'Complete technical documentation',
				'Content management training',
			],
		},
		infrastructure: {
			title: 'Professional Infrastructure & Support',
			description:
				'Professional hosting and maintenance service to guarantee performance and security 24/7',
			details: [
				'High-performance hosting with global CDN',
				'Automatic SSL certificates and renewal',
				'Automated daily backups with 30-day retention',
				'Proactive monitoring and real-time alerts',
				'Automatic security updates',
				'Priority technical support via email',
				'Detailed monthly performance reports',
				'Anti-DDoS protection and advanced firewall',
				'Continuous performance optimization',
			],
		},
		guarantee: {
			title: 'Guarantees & Commitment',
			description: 'Your peace of mind is our priority',
			points: [
				'Source code delivered at project completion - you own it',
				'99.9% uptime availability guarantee',
				'Free migration if you want to change hosting',
				'No hidden fees - transparent pricing',
				'Consultations and quotes always free',
			],
		},
	},
	support: {
		title: 'Technical Support Levels',
		subtitle: 'Support tailored to your needs and budget',
		responseLabel: 'Response:',
		levels: [
			{
				name: 'Standard Support',
				price: 'Included',
				responseTime: '48h business hours',
				availability: 'Mon-Fri 9am-5pm',
				description:
					'Email support for technical questions and routine maintenance',
				features: [
					'Email support',
					'Bug resolution',
					'Technical questions',
					'Usage help',
					'Monthly reports',
				],
				suitable: 'Showcase sites, small businesses',
			},
			{
				name: 'Priority Support',
				price: `+${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.support.priority)}/month`,
				responseTime: '24h business hours',
				availability: 'Mon-Fri 8am-7pm',
				description:
					'Enhanced support with fast response and personalized follow-up',
				features: [
					'All Standard Support',
					'Priority response',
					'Personalized follow-up',
					'Phone hotline',
					'Optimization advice',
				],
				suitable: 'E-commerce, high-traffic sites',
			},
			{
				name: 'Urgent Support',
				price: `+${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.support.urgent)}/month`,
				responseTime: '4h maximum',
				availability: 'Mon-Sun 8am-10pm',
				description:
					'Critical support for important business applications',
				features: [
					'All Priority Support',
					'Emergency intervention',
					'Weekend support',
					'Priority hotline',
					'Proactive monitoring',
				],
				suitable: 'Critical applications, enterprises',
			},
		],
		note: 'For specific needs (24/7, custom SLA), we offer tailored agreements based on your requirements.',
	},
	cta: {
		title: 'Ready to start your project?',
		description:
			'Get a free consultation and detailed quote for your website.',
		button: 'Get Your Free Quote',
	},
	contactButton: 'Contact Us',
} as const
