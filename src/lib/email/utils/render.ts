import { render } from '@react-email/components'
import type { ReactElement } from 'react'

export async function renderEmailTemplate(
	template: ReactElement,
): Promise<{ html: string; text?: string }> {
	try {
		const html = await render(template, {
			pretty: true,
		})

		// Generate plain text version by stripping HTML tags
		const text = html
			.replace(/<[^>]*>/g, '')
			.replace(/\s+/g, ' ')
			.trim()

		return { html, text }
	} catch (error) {
		throw new Error(
			`Failed to render email template: ${error instanceof Error ? error.message : 'Unknown error'}`,
		)
	}
}
