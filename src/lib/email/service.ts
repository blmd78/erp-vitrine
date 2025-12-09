import { ResendProvider } from './providers/resend'
import { renderEmailTemplate } from './utils/render'
import { validateEmailAddresses, validateEmailData } from './utils/validation'

import type { EmailConfig, EmailData, EmailResponse } from '@/types/email'

export class EmailService {
	private provider: ResendProvider
	private defaultFrom: string

	constructor(config: EmailConfig & { defaultFrom: string }) {
		if (config.provider === 'resend') {
			if (!config.apiKey) {
				throw new Error('Resend API key is required')
			}
			this.provider = new ResendProvider(config.apiKey)
		} else {
			throw new Error(`Unsupported email provider: ${config.provider}`)
		}

		this.defaultFrom = config.defaultFrom
	}

	async sendEmail(
		emailData: EmailData,
		templateComponent: React.ReactElement,
	): Promise<EmailResponse> {
		// Validate email data
		const validationErrors = validateEmailData(emailData)
		if (validationErrors.length > 0) {
			return {
				success: false,
				error: `Validation failed: ${validationErrors.join(', ')}`,
			}
		}

		// Validate email addresses
		if (!validateEmailAddresses(emailData.to)) {
			return {
				success: false,
				error: 'Invalid email addresses provided',
			}
		}

		try {
			// Render template
			const { html } = await renderEmailTemplate(templateComponent)

			// Send email
			const result = await this.provider.sendEmail({
				to: emailData.to,
				from: emailData.from || this.defaultFrom,
				subject: emailData.subject || 'No Subject',
				html,
			})

			return result
		} catch (error) {
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: 'Unknown error occurred',
			}
		}
	}
}
