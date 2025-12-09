import { PRICING_CONFIG } from '@/lib/config/pricing/pricing-config'

export const pricing = {
	pageTitle: `Développement Web dès ${PRICING_CONFIG.monthly.base}€/mois | Nextnode`,
	sections: {
		plans: {
			title: 'Choisissez Votre Plan',
			subtitle:
				'Des solutions adaptées à chaque étape de votre croissance',
		},
		included: {
			title: 'Tout Ce Qui Est Inclus',
			subtitle: `Dans votre forfait mensuel à ${PRICING_CONFIG.monthly.base}€`,
		},
		idealFor: 'IDÉAL POUR',
		alreadyIncluded: '🎯 Déjà dans votre forfait',
		examplesTitle: '💡 Exemples concrets :',
		discoverPlans: 'Découvrir nos plans',
	},
	hero: {
		title: 'TARIFS',
		titleHighlight: 'TRANSPARENTS',
		titleEnd: 'POUR VOTRE SUCCÈS',
		subtitle:
			'Développement sur-mesure de vrais sites web en code - Agence web Paris & Île-de-France',
		description:
			'Contrairement aux solutions no-code limitantes, nous développons de vrais sites web en code qui vous appartiennent entièrement. Basés à Paris, nous servons les entreprises franciliennes avec liberté totale de fonctionnalités, évolutivité garantie et performances optimales. Tarification transparente adaptée au marché parisien.',
		badge: '💡 Consultation gratuite incluse',
		cta: {
			button: 'Consultation Gratuite pour Cerner Votre Projet',
			subtitle:
				'Échangeons sur vos besoins pour déterminer la solution idéale et vous fournir un devis précis',
		},
	},
	plans: {
		starter: {
			name: 'Starter',
			tagline: 'Site web en code, pas de limitations',
			price: `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.starter.min)} - ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.starter.max)}`,
			recurring: `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.monthly.base)}/mois`,
			badge: 'Idéal pour débuter',
			description:
				"Votre propre site web développé en code moderne. Contrairement aux plateformes no-code, vous disposez d'une liberté totale pour évoluer et ajouter toutes les fonctionnalités souhaitées.",
			features: [
				"Page d'accueil unique",
				'Design responsive mobile',
				'Intégration formulaire de contact',
				'Optimisation SEO',
				'Certificat SSL',
				'Configuration analytics',
				'Monitoring infrastructure 24/7',
				'Rapports de performance mensuels',
			],
			cta: 'Démarrer Votre Projet',
			examples: [
				'Menu de restaurant avec horaires & contact',
				"Vitrine d'entreprise de services (plombier, avocat...)",
				'Portfolio créatif (photographe, designer...)',
				"Page d'accueil artisan local",
			],
		},
		business: {
			name: 'Business',
			tagline: 'Applications web complètes en code',
			price: `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.business.min)} - ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.plans.business.max)}`,
			recurring: `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.monthly.base)}/mois`,
			badge: 'Complet et évolutif',
			description:
				"Sites web complets développés en code avec toutes les fonctionnalités avancées possibles. Architecture évolutive permettant d'intégrer n'importe quelle solution ou API.",
			features: [
				'Site multi-pages (5-15 pages)',
				'Design et branding personnalisés',
				'Intégration CMS',
				'Capacités e-commerce',
				'SEO avancé',
				'Intégrations tierces',
				'Optimisation des performances',
				'Support prioritaire',
				"Revues d'optimisation mensuelles",
			],
			cta: 'Obtenir un Devis',
			examples: [
				"Site web d'entreprise multi-pages avec blog",
				'Boutique e-commerce (<100 produits)',
				'Site de réservation (restaurant, coiffeur...)',
				'Site immobilier avec recherche avancée',
				'Plateforme associative avec membres',
			],
		},
		enterprise: {
			name: 'Enterprise',
			tagline: 'Développement sans limites techniques',
			price: 'Devis Personnalisé',
			recurring: `${PRICING_CONFIG.monthly.base}€+/mois`,
			badge: 'Sur-mesure avancé',
			description:
				'Applications web complexes entièrement développées en code. Aucune limite technique, intégrations avancées, performances maximales. Votre vision devient réalité sans compromis.',
			features: [
				'Applications web personnalisées',
				'Intégrations complexes',
				'Support multi-langues',
				'Sécurité avancée',
				'Architecture évolutive',
				'Chef de projet dédié',
				'Garanties SLA',
				"Solutions d'hébergement personnalisées",
				'Support prioritaire 24/7',
			],
			cta: 'Nous Contacter',
			examples: [
				'Applications SaaS personnalisées',
				"Portails d'entreprise avec authentification",
				'Plateformes e-learning avec vidéos',
				'Marketplace multi-vendeurs',
				'Systèmes de gestion sur-mesure',
			],
		},
	},
	pricing: {
		title: 'Ce Qui Est Inclus Dans Chaque Projet',
		subtitle:
			'Une solution complète qui vous donne tous les outils pour réussir',
		development: {
			title: 'Développement Sur-Mesure',
			description:
				'Code propriétaire développé spécifiquement pour vos besoins',
			details: [
				'Architecture moderne et évolutive (React, TypeScript, Node.js)',
				'Code source entièrement à vous - aucune dépendance externe',
				'Design responsive adapté à tous les appareils',
				'Optimisations SEO avancées intégrées',
				'Performances optimales et temps de chargement rapides',
				'Sécurité renforcée avec les meilleures pratiques',
				'Documentation technique complète',
				'Formation pour la gestion de contenu',
			],
		},
		infrastructure: {
			title: 'Infrastructure & Support Pro',
			description:
				"Service d'hébergement et maintenance professionnel pour garantir performance et sécurité 24h/24",
			details: [
				`Hébergement haute performance avec CDN mondial (${PRICING_CONFIG.monthly.base}€/mois)`,
				'Certificats SSL automatiques et renouvellement',
				'Sauvegardes automatisées quotidiennes avec rétention 30 jours',
				'Monitoring proactif et alertes en temps réel',
				'Mises à jour de sécurité automatiques',
				'Support technique standard (réponse sous 48h ouvrables)',
				`Support prioritaire disponible (+${PRICING_CONFIG.support.priority}€/mois, réponse 24h)`,
				`Support urgent disponible (+${PRICING_CONFIG.support.urgent}€/mois, réponse 4h)`,
				'Rapports de performance mensuels détaillés',
				'Protection anti-DDoS et firewall avancé',
				'Optimisation continue des performances',
			],
		},
		guarantee: {
			title: 'Garanties & Engagement',
			description: "Votre tranquillité d'esprit est notre priorité",
			points: [
				'Code source remis en fin de projet - vous êtes propriétaire',
				'Garantie de fonctionnement 99.9% de disponibilité',
				"Migration gratuite si vous souhaitez changer d'hébergeur",
				'Aucun frais caché - tarification transparente',
				'Consultations et devis toujours gratuits',
			],
		},
	},
	support: {
		title: 'Niveaux de Support Technique',
		subtitle: 'Un support adapté à vos besoins et votre budget',
		responseLabel: 'Réponse :',
		levels: [
			{
				name: 'Support Standard',
				price: 'Inclus',
				responseTime: '48h ouvrées',
				availability: 'Lun-Ven 9h-17h',
				description:
					'Support par email pour les questions techniques et maintenance courante',
				features: [
					'Support par email',
					'Résolution de bugs',
					'Questions techniques',
					"Aide à l'utilisation",
					'Rapports mensuels',
				],
				suitable: 'Sites vitrine, petites entreprises',
			},
			{
				name: 'Support Prioritaire',
				price: `+${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.support.priority)}/mois`,
				responseTime: '24h ouvrées',
				availability: 'Lun-Ven 8h-19h',
				description:
					'Support renforcé avec réponse rapide et suivi personnalisé',
				features: [
					'Tout du Support Standard',
					'Réponse prioritaire',
					'Suivi personnalisé',
					'Hotline téléphonique',
					"Conseils d'optimisation",
				],
				suitable: 'E-commerce, sites à fort trafic',
			},
			{
				name: 'Support Urgent',
				price: `+${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(PRICING_CONFIG.support.urgent)}/mois`,
				responseTime: '4h maximum',
				availability: 'Lun-Dim 8h-22h',
				description:
					'Support critique pour les applications métier importantes',
				features: [
					'Tout du Support Prioritaire',
					'Intervention urgente',
					'Support weekend',
					'Hotline prioritaire',
					'Monitoring proactif',
				],
				suitable: 'Applications critiques, entreprises',
			},
		],
		note: 'Pour des besoins spécifiques (24/7, SLA personnalisés), nous proposons des accords sur-mesure selon vos exigences.',
	},
	cta: {
		title: 'Prêt à démarrer votre projet ?',
		description:
			'Obtenez une consultation gratuite et un devis détaillé pour votre site web.',
		button: 'Obtenir Votre Devis Gratuit',
	},
	localAdvantages: {
		title: 'Pourquoi choisir une agence web parisienne ?',
		subtitle: 'Les avantages de travailler en local',
		benefits: [
			{
				title: 'Rencontres en présentiel',
				description:
					'Rdv dans nos bureaux parisiens ou chez vous en Île-de-France',
			},
			{
				title: 'Connaissance du marché local',
				description:
					'Expertise des enjeux business parisiens et franciliens',
			},
			{
				title: 'Support réactif et proximité',
				description:
					'Équipe basée à Paris, disponible dans votre fuseau horaire',
			},
			{
				title: 'Tarifs adaptés au marché parisien',
				description:
					'Prix compétitifs et transparents pour les entreprises franciliennes',
			},
		],
	},
	contactButton: 'Nous Contacter',
} as const
