export interface EmailConfig {
	provider: 'resend' | 'nodemailer'
	apiKey?: string
	smtpConfig?: {
		host: string
		port: number
		secure: boolean
		auth: {
			user: string
			pass: string
		}
	}
}

export interface EmailTemplate {
	name: string
	subject: string
}

export interface EmailData {
	to: string | string[]
	from?: string
	subject?: string
	template: string
	data: Record<string, unknown> | ProjectRequestData
	provider?: EmailConfig['provider']
}

export interface EmailResponse {
	success: boolean
	messageId?: string
	error?: string
}

export interface ProjectRequestData {
	projectName: string
	userName: string
	userEmail: string
	companyName?: string
	projectDescription?: string
	budget?: string
	timeline?: string
	contactPreference?: 'email' | 'phone' | 'meeting'
	phoneNumber?: string
	additionalInfo?: string
}
