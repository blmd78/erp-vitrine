/**
 * Schema.org structured data for NextNode - Agence Web Paris
 * Optimisé pour le référencement local Paris/Île-de-France
 */

export interface LocalBusinessSchema {
	'@context': string
	'@type': string
	'@id'?: string
	name: string
	description: string
	url: string
	logo?: string
	image?: string[]
	telephone?: string
	email?: string
	address?: {
		'@type': string
		addressLocality: string
		addressRegion: string
		addressCountry: string
		postalCode?: string
	}
	geo?: {
		'@type': string
		latitude?: number
		longitude?: number
	}
	areaServed: string[]
	priceRange: string
	openingHours?: string[]
	sameAs?: string[]
	aggregateRating?: {
		'@type': string
		ratingValue: number
		reviewCount: number
	}
	serviceArea?: {
		'@type': string
		name: string
	}[]
}

/**
 * Génère le schema LocalBusiness pour NextNode
 */
export const createLocalBusinessSchema = (
	locale: 'en' | 'fr' = 'fr',
): LocalBusinessSchema => {
	const baseUrl = 'https://nextnode.fr'

	const descriptions = {
		fr: 'Agence web spécialisée à Paris dans la création de sites internet sur mesure, développement web et solutions digitales pour entreprises en Île-de-France.',
		en: 'Web agency specialized in Paris for custom website creation, web development and digital solutions for businesses in Île-de-France region.',
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${baseUrl}/#organization`,
		name: 'NextNode Solutions',
		description: descriptions[locale],
		url: baseUrl,
		logo: `${baseUrl}/logo.png`,
		image: [
			`${baseUrl}/og-image.png`,
			`${baseUrl}/images/nextnode-agence-web-paris.jpg`,
		],
		email: 'contact@nextnode.fr',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Paris',
			addressRegion: 'Île-de-France',
			addressCountry: 'FR',
		},
		areaServed: [
			'Paris',
			'Île-de-France',
			'75001',
			'75002',
			'75003',
			'75004',
			'75005',
			'75006',
			'75007',
			'75008',
			'75009',
			'75010',
			'75011',
			'75012',
			'75013',
			'75014',
			'75015',
			'75016',
			'75017',
			'75018',
			'75019',
			'75020',
			'Hauts-de-Seine',
			'Seine-Saint-Denis',
			'Val-de-Marne',
			'Yvelines',
			'Essonne',
			"Val-d'Oise",
			'Seine-et-Marne',
			'France',
		],
		priceRange: '€€€',
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 48.8566,
			longitude: 2.3522,
		},
		serviceArea: [
			{
				'@type': 'AdministrativeArea',
				name: 'Paris',
			},
			{
				'@type': 'AdministrativeArea',
				name: 'Île-de-France',
			},
		],
		openingHours: ['Mo-Fr 09:00-18:00'],
		sameAs: [
			'https://www.linkedin.com/company/nextnode-solutions',
			'https://github.com/NextNodeSolutions',
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: 5.0,
			reviewCount: 12,
		},
	}
}

/**
 * Schema WebSite pour les recherches sur la marque
 */
export const createWebSiteSchema = (locale: 'en' | 'fr' = 'fr') => {
	const baseUrl = 'https://nextnode.fr'

	const names = {
		fr: 'NextNode - Agence Web Paris',
		en: 'NextNode - Web Agency Paris',
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${baseUrl}/#website`,
		name: names[locale],
		url: baseUrl,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${baseUrl}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string',
		},
		publisher: {
			'@id': `${baseUrl}/#organization`,
		},
	}
}

/**
 * Schema Organisation pour établir l'autorité
 */
export const createOrganizationSchema = (locale: 'en' | 'fr' = 'fr') => {
	const baseUrl = 'https://nextnode.fr'

	const descriptions = {
		fr: 'Agence web innovante basée à Paris, spécialisée dans la création de sites internet performants et solutions digitales sur mesure pour entreprises.',
		en: 'Innovative web agency based in Paris, specialized in creating high-performance websites and custom digital solutions for businesses.',
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${baseUrl}/#organization`,
		name: 'NextNode Solutions',
		description: descriptions[locale],
		url: baseUrl,
		logo: `${baseUrl}/logo.png`,
		image: `${baseUrl}/og-image.png`,
		email: 'contact@nextnode.fr',
		foundingDate: '2023',
		founder: {
			'@type': 'Person',
			name: 'NextNode Team',
		},
		sameAs: [
			'https://www.linkedin.com/company/nextnode-solutions',
			'https://github.com/NextNodeSolutions',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer service',
			email: 'contact@nextnode.fr',
			areaServed: 'FR',
			availableLanguage: ['French', 'English'],
		},
	}
}

/**
 * Génère le JSON-LD complet avec @graph pour combiner tous les schemas
 */
export const createFullSchema = (locale: 'en' | 'fr' = 'fr') => {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			createOrganizationSchema(locale),
			createLocalBusinessSchema(locale),
			createWebSiteSchema(locale),
		],
	}
}

/**
 * Génère le script JSON-LD formaté pour injection dans <head>
 */
export const generateSchemaScript = (locale: 'en' | 'fr' = 'fr'): string => {
	const schema = createFullSchema(locale)
	return JSON.stringify(schema, null, 2)
}
