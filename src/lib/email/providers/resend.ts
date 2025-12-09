import { Resend } from 'resend'

import { emailLogger } from '../../logging'

import type { EmailResponse } from '@/types/email'

export class ResendProvider {
	private resend: Resend

	constructor(apiKey: string) {
		this.resend = new Resend(apiKey)
	}

	async sendEmail({
		to,
		from,
		subject,
		html,
	}: {
		to: string | string[]
		from: string
		subject: string
		html: string
	}): Promise<EmailResponse> {
		try {
			const { data, error } = await this.resend.emails.send({
				to: Array.isArray(to) ? to : [to],
				from,
				subject,
				html,
			})

			if (error) {
				emailLogger.error('Resend API error', {
					scope: 'resend-api-error',
					details: {
						message: error.message,
						name: error.name,
						error,
					},
				})
				return {
					success: false,
					error: error.message || 'Resend API error',
				}
			}

			return {
				success: true,
				messageId: data?.id,
			}
		} catch (error) {
			emailLogger.error('Exception while sending email', {
				scope: 'email-send-exception',
				details: {
					error,
					message: error instanceof Error ? error.message : 'Unknown',
					stack: error instanceof Error ? error.stack : undefined,
				},
			})
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
