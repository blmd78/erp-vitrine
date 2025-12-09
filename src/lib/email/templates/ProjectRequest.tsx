import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Row,
	Section,
	Text,
} from '@react-email/components'
import type React from 'react'

import type { ProjectRequestData } from '@/types/email'

interface ProjectRequestProps {
	data: ProjectRequestData
	companyName?: string
	companyLogo?: string
	websiteUrl?: string
}

export function ProjectRequest({
	data,
	companyName = 'NextNode',
	companyLogo,
	websiteUrl = 'https://nextnode.dev',
}: ProjectRequestProps): React.ReactElement {
	const {
		projectName,
		userName,
		userEmail,
		companyName: userCompany,
		projectDescription,
		budget,
		timeline,
		contactPreference,
		phoneNumber,
		additionalInfo,
	} = data

	return (
		<Html>
			<Head />
			<Body style={main}>
				<Container style={container}>
					{/* Header */}
					<Section style={header}>
						{companyLogo ? (
							<Img
								src={companyLogo}
								alt={companyName}
								style={logo}
							/>
						) : (
							<Heading style={companyTitle}>
								{companyName}
							</Heading>
						)}
					</Section>

					{/* Main Content */}
					<Section style={content}>
						<Heading style={h1}>Nouvelle demande de projet</Heading>

						<Text style={text}>
							Vous avez reçu une nouvelle demande de projet via
							votre site web.
						</Text>

						{/* Project Information */}
						<Section style={infoSection}>
							<Heading style={h2}>Informations du projet</Heading>

							<Row style={row}>
								<Column style={labelColumn}>
									<Text style={label}>Nom du projet :</Text>
								</Column>
								<Column style={valueColumn}>
									<Text style={value}>{projectName}</Text>
								</Column>
							</Row>

							{projectDescription && (
								<Row style={row}>
									<Column style={labelColumn}>
										<Text style={label}>Description :</Text>
									</Column>
									<Column style={valueColumn}>
										<Text style={value}>
											{projectDescription}
										</Text>
									</Column>
								</Row>
							)}

							{budget && (
								<Row style={row}>
									<Column style={labelColumn}>
										<Text style={label}>Budget :</Text>
									</Column>
									<Column style={valueColumn}>
										<Text style={value}>{budget}</Text>
									</Column>
								</Row>
							)}

							{timeline && (
								<Row style={row}>
									<Column style={labelColumn}>
										<Text style={label}>Délai :</Text>
									</Column>
									<Column style={valueColumn}>
										<Text style={value}>{timeline}</Text>
									</Column>
								</Row>
							)}
						</Section>

						<Hr style={hr} />

						{/* Contact Information */}
						<Section style={infoSection}>
							<Heading style={h2}>
								Informations de contact
							</Heading>

							<Row style={row}>
								<Column style={labelColumn}>
									<Text style={label}>Nom :</Text>
								</Column>
								<Column style={valueColumn}>
									<Text style={value}>{userName}</Text>
								</Column>
							</Row>

							<Row style={row}>
								<Column style={labelColumn}>
									<Text style={label}>Email :</Text>
								</Column>
								<Column style={valueColumn}>
									<Link
										href={`mailto:${userEmail}`}
										style={link}
									>
										{userEmail}
									</Link>
								</Column>
							</Row>

							{userCompany && (
								<Row style={row}>
									<Column style={labelColumn}>
										<Text style={label}>Entreprise :</Text>
									</Column>
									<Column style={valueColumn}>
										<Text style={value}>{userCompany}</Text>
									</Column>
								</Row>
							)}

							{phoneNumber && (
								<Row style={row}>
									<Column style={labelColumn}>
										<Text style={label}>Téléphone :</Text>
									</Column>
									<Column style={valueColumn}>
										<Link
											href={`tel:${phoneNumber}`}
											style={link}
										>
											{phoneNumber}
										</Link>
									</Column>
								</Row>
							)}

							{contactPreference && (
								<Row style={row}>
									<Column style={labelColumn}>
										<Text style={label}>
											Contact préféré :
										</Text>
									</Column>
									<Column style={valueColumn}>
										<Text style={value}>
											{contactPreference === 'email'
												? 'Email'
												: contactPreference === 'phone'
													? 'Téléphone'
													: 'Rendez-vous'}
										</Text>
									</Column>
								</Row>
							)}
						</Section>

						{additionalInfo && (
							<>
								<Hr style={hr} />
								<Section style={infoSection}>
									<Heading style={h2}>
										Informations supplémentaires
									</Heading>
									<Text style={value}>{additionalInfo}</Text>
								</Section>
							</>
						)}

						{/* Call to Action */}
						<Section style={ctaSection}>
							<Text style={text}>
								Répondez directement à cet email ou contactez{' '}
								{userName} via les informations fournies
								ci-dessus.
							</Text>
						</Section>
					</Section>

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Cet email a été généré automatiquement depuis{' '}
							<Link href={websiteUrl} style={footerLink}>
								{websiteUrl}
							</Link>
						</Text>
						<Text style={footerText}>© 2024 {companyName}</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

// Styles
const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
	maxWidth: '600px',
}

const header = {
	textAlign: 'center' as const,
	padding: '20px 0',
}

const logo = {
	height: '48px',
	width: 'auto',
}

const companyTitle = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#1a1a1a',
	margin: '0',
}

const content = {
	backgroundColor: '#ffffff',
	border: '1px solid #e6ebf1',
	borderRadius: '8px',
	padding: '32px',
	boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}

const h1 = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#1a1a1a',
	margin: '0 0 24px 0',
	textAlign: 'center' as const,
}

const h2 = {
	fontSize: '18px',
	fontWeight: '600',
	color: '#374151',
	margin: '0 0 16px 0',
}

const text = {
	fontSize: '16px',
	color: '#6b7280',
	lineHeight: '24px',
	margin: '0 0 16px 0',
}

const infoSection = {
	margin: '24px 0',
}

const row = {
	margin: '8px 0',
}

const labelColumn = {
	width: '140px',
	verticalAlign: 'top' as const,
}

const valueColumn = {
	verticalAlign: 'top' as const,
}

const label = {
	fontSize: '14px',
	fontWeight: '600',
	color: '#6b7280',
	margin: '0',
}

const value = {
	fontSize: '14px',
	color: '#1f2937',
	margin: '0',
	wordBreak: 'break-word' as const,
}

const link = {
	fontSize: '14px',
	color: '#3b82f6',
	textDecoration: 'none',
}

const hr = {
	border: 'none',
	borderTop: '1px solid #e5e7eb',
	margin: '24px 0',
}

const ctaSection = {
	margin: '32px 0',
	padding: '24px',
	backgroundColor: '#f9fafb',
	borderRadius: '6px',
	textAlign: 'center' as const,
}

const footer = {
	textAlign: 'center' as const,
	margin: '32px 0 0 0',
}

const footerText = {
	fontSize: '12px',
	color: '#9ca3af',
	margin: '4px 0',
}

const footerLink = {
	fontSize: '12px',
	color: '#6b7280',
	textDecoration: 'none',
}
