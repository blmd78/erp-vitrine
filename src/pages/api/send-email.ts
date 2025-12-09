/**
 * API endpoint for sending project request emails
 * Validates input data and sends email using the EmailService
 */

import { getConfig } from '@nextnode/config-manager'
import type { APIRoute } from 'astro'

import { EmailService } from '../../lib/email'
import { ProjectRequest } from '../../lib/email/templates'
import { validateProjectRequestData } from '../../lib/email/utils/validation'
import { emailLogger } from '../../lib/logging'
import {
	createBadRequestResponse,
	createInternalServerErrorResponse,
	createMethodNotAllowedResponse,
	createSuccessResponse,
} from '../../lib/utils/api-response'

import type { ProjectRequestData } from '@/types/email'

export const POST: APIRoute = async ({ request }) => {
	try {
		// Parse request body
		let body: unknown
		try {
			body = await request.json()
		} catch {
			return createBadRequestResponse('Invalid JSON in request body')
		}

		// Validate body structure
		if (!body || typeof body !== 'object' || Array.isArray(body)) {
			return createBadRequestResponse('Request body must be an object')
		}

		const projectData = body as ProjectRequestData

		// Validate project request data
		const validationErrors = validateProjectRequestData(projectData)
		if (validationErrors.length > 0) {
			return createBadRequestResponse(
				'Validation failed',
				validationErrors,
			)
		}

		// Get configuration
		const emailConfig = getConfig('email')
		const resendApiKey = import.meta.env.RESEND_API_KEY

		// Validate configuration
		if (!emailConfig) {
			emailLogger.error('Email configuration not found', {
				scope: 'config-error',
			})
			return createInternalServerErrorResponse(
				'Email configuration not found',
			)
		}

		if (!resendApiKey) {
			emailLogger.error(
				'RESEND_API_KEY environment variable is not set',
				{
					scope: 'config-error',
				},
			)
			return createInternalServerErrorResponse(
				'Email service not configured',
			)
		}

		if (!emailConfig.from || !emailConfig.to) {
			emailLogger.error(
				'Email addresses not configured in config files',
				{
					scope: 'config-error',
				},
			)
			return createInternalServerErrorResponse(
				'Email addresses not configured',
			)
		}

		// Initialize email service
		const emailService = new EmailService({
			provider: emailConfig.provider as 'resend' | 'nodemailer',
			apiKey: resendApiKey,
			defaultFrom: emailConfig.from,
		})

		// Create email template with configuration
		const templateConfig = emailConfig.templates.projectRequest
		const emailTemplate = ProjectRequest({
			data: projectData,
			companyName: templateConfig.companyName,
			websiteUrl: templateConfig.websiteUrl,
			companyLogo: templateConfig.companyLogo || undefined,
		})

		// Create subject from template with variable substitution
		const subject = templateConfig.subject.replace(
			'{{projectName}}',
			projectData.projectName,
		)

		// Send email
		const result = await emailService.sendEmail(
			{
				to: emailConfig.to,
				from: emailConfig.from,
				subject,
				template: 'ProjectRequest',
				data: projectData,
			},
			emailTemplate,
		)

		if (!result.success) {
			emailLogger.error('Failed to send email', {
				scope: 'email-send-error',
				details: {
					error: result.error,
					from: emailConfig.from,
					to: emailConfig.to,
					provider: emailConfig.provider,
				},
			})
			return createInternalServerErrorResponse(
				result.error || 'Failed to send email',
				{
					message: result.error,
					from: emailConfig.from,
					to: emailConfig.to,
				},
			)
		}

		return createSuccessResponse(
			{ messageId: result.messageId },
			'Email sent successfully',
			result.messageId,
		)
	} catch (error) {
		emailLogger.error('Unexpected error in send-email API', {
			scope: 'api-error',
			details: { error },
		})

		return createInternalServerErrorResponse(
			'Internal server error',
			error instanceof Error ? error.message : 'Unknown error',
		)
	}
}

// Only allow POST requests
export const GET: APIRoute = () => createMethodNotAllowedResponse(['POST'])
