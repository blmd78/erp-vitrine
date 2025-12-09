export const workflow = {
	steps: {
		discovery: {
			title: 'Discovery & Strategy',
			number: '01',
			description:
				'Transform your vision into a concrete and actionable strategy.',
			fullDescription:
				'Transform your vision into a concrete and actionable strategy. • Collaborative workshops and thorough technical audit • Clear roadmap with priorities and optimized budget',
			benefits: [
				{
					title: 'Clear Vision',
					description:
						'Transform vague ideas into actionable plans with measurable goals and success metrics.',
					icon: 'Target',
				},
				{
					title: 'Risk Mitigation',
					description:
						'Identify potential challenges early and build strategies to overcome them before they become problems.',
					icon: 'Shield',
				},
				{
					title: 'Smart Investment',
					description:
						'Prioritize features that deliver maximum value, ensuring your budget is spent where it matters most.',
					icon: 'Lightbulb',
				},
				{
					title: 'Team Alignment',
					description:
						'Get everyone on the same page with shared understanding of goals, scope, and success criteria.',
					icon: 'Users',
				},
			],
			deliverables: [
				{
					name: 'Project Charter',
					description:
						'Complete project scope, objectives, and success criteria',
					type: 'document',
				},
				{
					name: 'Technical Specification',
					description:
						'Detailed technical requirements and architecture recommendations',
					type: 'document',
				},
				{
					name: 'User Personas',
					description: 'Research-backed target audience profiles',
					type: 'document',
				},
				{
					name: 'Competitive Analysis',
					description:
						'Market positioning and differentiation strategy',
					type: 'document',
				},
			],
			timeline: {
				duration: '1-2 weeks',
				milestones: [
					'Stakeholder interviews completed',
					'Requirements gathering finalized',
					'Technical audit report delivered',
					'Project roadmap approved',
				],
			},
			ctaText: 'Start Discovery',
		},
		design: {
			title: 'Design & UX/UI',
			number: '02',
			description:
				'Interfaces that captivate visitors and boost your conversions.',
			fullDescription:
				'User experiences that naturally convert your visitors. • Interfaces reflecting your brand identity • Smooth and intuitive journeys that build trust',
			benefits: [
				{
					title: 'Higher Conversions',
					description:
						'Intuitive interfaces that guide users effortlessly toward action, turning visitors into customers.',
					icon: 'TrendingUp',
				},
				{
					title: 'Brand Differentiation',
					description:
						'Stand out from competitors with unique designs that capture your brand essence and values.',
					icon: 'Sparkles',
				},
				{
					title: 'User Confidence',
					description:
						'Professional, polished designs build trust and credibility with your audience instantly.',
					icon: 'Gem',
				},
				{
					title: 'Mobile Excellence',
					description:
						'Flawless experiences across all devices, ensuring no opportunity is lost to poor mobile design.',
					icon: 'Smartphone',
				},
			],
			deliverables: [
				{
					name: 'Wireframes',
					description: 'Low-fidelity layouts for rapid iteration',
					type: 'document',
				},
				{
					name: 'High-Fidelity Mockups',
					description: 'Pixel-perfect designs ready for development',
					type: 'asset',
				},
				{
					name: 'Interactive Prototype',
					description: 'Clickable Figma prototype for user testing',
					type: 'asset',
				},
				{
					name: 'Design System',
					description:
						'Component library, typography, colors, spacing',
					type: 'document',
				},
			],
			timeline: {
				duration: '2-4 weeks',
				milestones: [
					'Wireframes reviewed and approved',
					'Design system established',
					'High-fidelity mockups completed',
					'User testing conducted',
					'Final designs handed off to development',
				],
			},
			ctaText: 'View Our Designs',
		},
		development: {
			title: 'Full-Stack Development',
			number: '03',
			description:
				'Clean, performant code for fast and scalable applications.',
			fullDescription:
				'Your application built with modern technologies and proven practices. • Clean, documented code architected to scale • Solid technical foundations ensuring performance and security',
			benefits: [
				{
					title: 'Lightning Speed',
					description:
						'Optimized performance means faster load times, better SEO, and happier users who stay engaged.',
					icon: 'Zap',
				},
				{
					title: 'Rock-Solid Security',
					description:
						'Industry-standard security practices protect your data and build trust with your users.',
					icon: 'Lock',
				},
				{
					title: 'Future-Proof',
					description:
						'Scalable architecture grows with your business without costly rewrites or technical debt.',
					icon: 'Rocket',
				},
				{
					title: 'Maintainability',
					description:
						'Clean, documented code makes future updates and feature additions smooth and cost-effective.',
					icon: 'Wrench',
				},
			],
			deliverables: [
				{
					name: 'Frontend Application',
					description:
						'Responsive web app with pixel-perfect implementation',
					type: 'code',
				},
				{
					name: 'Backend APIs',
					description: 'RESTful or GraphQL APIs with documentation',
					type: 'code',
				},
				{
					name: 'Database Schema',
					description: 'Optimized data models and migrations',
					type: 'code',
				},
				{
					name: 'Third-Party Integrations',
					description:
						'Payment, analytics, CRM, and other service integrations',
					type: 'code',
				},
			],
			timeline: {
				duration: '4-12 weeks',
				milestones: [
					'Development environment setup',
					'Core features implemented',
					'API integrations completed',
					'Frontend-backend integration',
					'Code review and optimization',
				],
			},
			ctaText: 'Explore Tech Stack',
		},
		testing: {
			title: 'Testing & Optimization',
			number: '04',
			description:
				'Maximum performance and zero bugs for a confident launch.',
			fullDescription:
				'Every feature rigorously tested for a confident launch. • Automated, manual, and real-world testing • Performance optimization and cross-browser validation',
			benefits: [
				{
					title: 'Zero Surprises',
					description:
						'Catch and fix issues before launch, ensuring a smooth, professional debut for your product.',
					icon: 'Target',
				},
				{
					title: 'Peak Performance',
					description:
						'Fine-tuned optimization delivers blazing-fast experiences that keep users engaged and satisfied.',
					icon: 'Zap',
				},
				{
					title: 'Universal Compatibility',
					description:
						'Perfect functionality across all browsers, devices, and screen sizes—no user left behind.',
					icon: 'Globe',
				},
				{
					title: 'Confidence',
					description:
						'Launch with peace of mind knowing your application has been thoroughly validated and optimized.',
					icon: 'ShieldCheck',
				},
			],
			deliverables: [
				{
					name: 'Test Suite',
					description: 'Automated unit, integration, and E2E tests',
					type: 'code',
				},
				{
					name: 'QA Report',
					description: 'Detailed testing results and bug tracker',
					type: 'document',
				},
				{
					name: 'Performance Audit',
					description:
						'Lighthouse scores, load times, optimization recommendations',
					type: 'document',
				},
				{
					name: 'Browser Compatibility Matrix',
					description: 'Tested browsers and devices with screenshots',
					type: 'document',
				},
			],
			timeline: {
				duration: '1-2 weeks',
				milestones: [
					'Automated test suite completed',
					'Manual QA across devices/browsers',
					'Performance optimization',
					'Security audit passed',
					'UAT (User Acceptance Testing) completed',
				],
			},
			ctaText: 'Learn About QA',
		},
		deployment: {
			title: 'Deployment & Infrastructure',
			number: '05',
			description:
				'Secure, scalable infrastructure with 24/7 monitoring for your launch.',
			fullDescription:
				'Scalable and secure cloud infrastructure for a stress-free launch. • Real-time monitoring and automated deployments • 24/7 availability with automatic backups',
			benefits: [
				{
					title: 'Global Performance',
					description:
						'CDN distribution ensures fast load times for users worldwide, improving engagement and SEO.',
					icon: 'Globe',
				},
				{
					title: 'Automatic Scaling',
					description:
						'Infrastructure that grows with your traffic, handling spikes effortlessly without downtime.',
					icon: 'BarChart3',
				},
				{
					title: 'Always Secure',
					description:
						'Enterprise-grade security with SSL certificates, DDoS protection, and regular security updates.',
					icon: 'ShieldCheck',
				},
				{
					title: 'Peace of Mind',
					description:
						'24/7 monitoring, automatic backups, and instant alerts keep your site running smoothly.',
					icon: 'Shield',
				},
			],
			deliverables: [
				{
					name: 'Production Environment',
					description:
						'Fully configured hosting with CDN and security',
					type: 'service',
				},
				{
					name: 'CI/CD Pipeline',
					description:
						'Automated deployment workflow with GitHub Actions',
					type: 'code',
				},
				{
					name: 'Monitoring Dashboard',
					description:
						'Real-time analytics, errors, and performance metrics',
					type: 'service',
				},
				{
					name: 'Documentation',
					description:
						'Deployment guides, admin manual, and troubleshooting tips',
					type: 'document',
				},
			],
			timeline: {
				duration: '3-5 days',
				milestones: [
					'Production environment provisioned',
					'Database migrated and verified',
					'DNS and SSL configured',
					'Deployment pipeline tested',
					'Go-live executed',
					'Post-launch monitoring',
				],
			},
			ctaText: 'Deployment Checklist',
		},
		support: {
			title: 'Support & Maintenance',
			number: '06',
			description:
				'Continuous partnership to evolve your application without limits.',
			fullDescription:
				'Your long-term technology partner for constraint-free growth. • Continuous maintenance, quick fixes, and new features • Monthly reports and quarterly planning',
			benefits: [
				{
					title: 'Stay Current',
					description:
						'Regular updates keep your application secure, fast, and compatible with the latest technologies.',
					icon: 'RefreshCw',
				},
				{
					title: 'Rapid Response',
					description:
						'Quick fixes and support when you need it, minimizing any disruption to your business operations.',
					icon: 'Zap',
				},
				{
					title: 'Continuous Growth',
					description:
						'Add new features and capabilities as your business scales, without starting from scratch.',
					icon: 'TrendingUp',
				},
				{
					title: 'Expert Partnership',
					description:
						'Strategic guidance and technical expertise to help you make informed decisions as you grow.',
					icon: 'Users',
				},
			],
			deliverables: [
				{
					name: 'Monthly Reports',
					description:
						'Performance metrics, uptime, and usage analytics',
					type: 'document',
				},
				{
					name: 'Security Patches',
					description:
						'Regular dependency updates and vulnerability fixes',
					type: 'code',
				},
				{
					name: 'Feature Enhancements',
					description:
						'Prioritized roadmap for new features and improvements',
					type: 'code',
				},
				{
					name: 'Backup & Recovery',
					description:
						'Automated daily backups with disaster recovery plan',
					type: 'service',
				},
			],
			timeline: {
				duration: 'Ongoing',
				milestones: [
					'24/7 monitoring active',
					'Monthly performance review',
					'Quarterly feature planning',
					'Annual security audit',
				],
			},
			ctaText: 'Support Plans',
		},
	},
	labels: {
		mainTasks: 'Main Tasks',
		deliverables: 'Deliverables',
		estimatedDuration: 'Estimated Duration',
	},
	modal: {
		overview: 'Overview',
		keyBenefits: 'Key Benefits',
		whatYouGet: 'What You Get',
		timeline: 'Timeline',
		duration: 'Duration',
		closeModal: 'Close modal',
		dragHandle: 'Drag handle',
	},
} as const
