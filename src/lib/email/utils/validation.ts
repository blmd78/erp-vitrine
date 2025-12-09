import type { EmailData, ProjectRequestData } from '@/types/email'

export function validateEmailData(data: EmailData): string[] {
	const errors: string[] = []

	// Validate recipients
	if (!data.to || (Array.isArray(data.to) && data.to.length === 0)) {
		errors.push('At least one recipient email is required')
	}

	// Validate email addresses
	const emails = Array.isArray(data.to) ? data.to : [data.to]
	emails.forEach((email, index) => {
		if (!validateEmailAddress(email)) {
			errors.push(`Invalid email address at index ${index}: ${email}`)
		}
	})

	// Validate template name
	if (!data.template || data.template.trim() === '') {
		errors.push('Template name is required')
	}

	// Validate data object
	if (!data.data || typeof data.data !== 'object') {
		errors.push('Template data must be an object')
	}

	return errors
}

export function validateProjectRequestData(data: ProjectRequestData): string[] {
	const errors: string[] = []

	// Required fields
	if (!data.projectName || data.projectName.trim() === '') {
		errors.push('Project name is required')
	}

	if (!data.userName || data.userName.trim() === '') {
		errors.push('User name is required')
	}

	if (!data.userEmail || data.userEmail.trim() === '') {
		errors.push('User email is required')
	} else if (!validateEmailAddress(data.userEmail)) {
		errors.push('Invalid user email address')
	}

	// Optional but validated if present
	if (data.phoneNumber && !isValidPhoneNumber(data.phoneNumber)) {
		errors.push('Invalid phone number format')
	}

	if (
		data.contactPreference &&
		!['email', 'phone', 'meeting'].includes(data.contactPreference)
	) {
		errors.push('Contact preference must be email, phone, or meeting')
	}

	return errors
}

export function validateEmailAddress(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export function validateEmailAddresses(emails: string | string[]): boolean {
	const emailList = Array.isArray(emails) ? emails : [emails]
	return emailList.every(validateEmailAddress)
}

function isValidPhoneNumber(phone: string): boolean {
	// Basic international phone number validation
	const phoneRegex = /^[+]?[\d\s\-()]{8,20}$/
	return phoneRegex.test(phone.trim())
}
