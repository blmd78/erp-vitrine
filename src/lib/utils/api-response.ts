/**
 * API Response utilities for consistent JSON responses
 */

import { HTTP_HEADERS, HTTP_STATUS } from '../constants'

type ApiSuccessResponse<T = unknown> = {
	success: true
	data?: T
	message?: string
	messageId?: string
}

type ApiErrorResponse = {
	success: false
	error: string
	details?: unknown
}

type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Creates a JSON Response with consistent structure
 */
export const createJsonResponse = <T = unknown>(
	data: ApiResponse<T>,
	status: number,
	additionalHeaders?: Record<string, string>,
): Response => {
	const headers = {
		...HTTP_HEADERS.CONTENT_TYPE_JSON,
		...additionalHeaders,
	}

	return new Response(JSON.stringify(data), {
		status,
		headers,
	})
}

/**
 * Creates a success JSON response
 */
export const createSuccessResponse = <T = unknown>(
	data?: T,
	message?: string,
	messageId?: string,
): Response => {
	return createJsonResponse(
		{
			success: true,
			...(data !== undefined && { data }),
			...(message && { message }),
			...(messageId && { messageId }),
		},
		HTTP_STATUS.OK,
	)
}

/**
 * Creates an error JSON response
 */
export const createErrorResponse = (
	error: string,
	status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
	details?: unknown,
): Response => {
	const responseData: ApiErrorResponse = {
		success: false,
		error,
	}

	if (details !== undefined) {
		responseData.details = details
	}

	return createJsonResponse(responseData, status)
}

/**
 * Creates a bad request error response
 */
export const createBadRequestResponse = (
	error: string,
	details?: unknown,
): Response => {
	return createErrorResponse(error, HTTP_STATUS.BAD_REQUEST, details)
}

/**
 * Creates a method not allowed response
 */
export const createMethodNotAllowedResponse = (
	allowedMethods: string[] = ['POST'],
): Response => {
	return createJsonResponse(
		{
			success: false,
			error: `Method not allowed. Use ${allowedMethods.join(' or ')} instead.`,
		},
		HTTP_STATUS.METHOD_NOT_ALLOWED,
		{ Allow: allowedMethods.join(', ') },
	)
}

/**
 * Creates an internal server error response
 */
export const createInternalServerErrorResponse = (
	error: string = 'Internal server error',
	details?: unknown,
): Response => {
	return createErrorResponse(
		error,
		HTTP_STATUS.INTERNAL_SERVER_ERROR,
		details,
	)
}
