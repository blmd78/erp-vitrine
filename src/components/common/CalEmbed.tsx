import { useCallback, useMemo } from 'react'

import Cal, { getCalApi } from '@calcom/embed-react'
import type { ReactNode } from 'react'

import { ButtonPrimitive } from '@/components/ui/forms/Button'
import { useI18n } from '@/lib/i18n/I18nReact'
import { componentLogger } from '@/lib/logging'

import type { Locale } from '@/types/i18n'

export interface CalEmbedProps {
	/** Cal.com username/link (e.g., 'walid-mos') */
	calLink: string
	/** Display mode - popup opens modal, inline embeds directly */
	mode?: 'popup' | 'inline'
	/** Button content (for popup mode) */
	children?: ReactNode
	/** Accessible label for button */
	ariaLabel?: string
	/** Custom button className */
	buttonClassName?: string
	/** Cal.com theme */
	theme?: 'light' | 'dark' | 'auto'
	/** Additional Cal.com configuration */
	config?: Record<string, unknown>
	/** Locale override for proper SSR hydration */
	locale?: Locale
}

/**
 * Modern Cal.com integration component with TypeScript and i18n support
 *
 * Features:
 * - Automatic language detection from NextNode i18n system
 * - TypeScript-first with strict typing
 * - Modern React patterns with hooks
 * - Graceful error handling and fallbacks
 * - Responsive design and accessibility
 */
export const CalEmbed = ({
	calLink,
	mode = 'popup',
	children,
	ariaLabel,
	buttonClassName,
	theme = 'auto',
	config = {},
	locale: initialLocale,
}: CalEmbedProps) => {
	const { locale } = useI18n(initialLocale)

	// Language configuration based on locale
	const calLanguage = useMemo(() => {
		return locale === 'fr' ? 'fr' : 'en'
	}, [locale])

	// Cal.com configuration - only used for inline mode
	const calConfig = useMemo(
		() => ({
			theme,
			language: calLanguage,
			...config,
		}),
		[theme, calLanguage, config],
	)

	// Popup mode handler
	const handlePopupClick = useCallback(async () => {
		try {
			const cal = await getCalApi({})
			cal('modal', {
				calLink: calLink,
				config: {
					theme,
					layout: 'month_view',
				},
			})
		} catch (error) {
			componentLogger.error('Cal.com popup failed', {
				details: {
					calLink: calLink,
					error:
						error instanceof Error ? error.message : String(error),
				},
			})
		}
	}, [calLink, theme])

	if (mode === 'popup') {
		return (
			<ButtonPrimitive
				type="button"
				onClick={handlePopupClick}
				className={buttonClassName}
				aria-label={ariaLabel}
			>
				{children}
			</ButtonPrimitive>
		)
	}

	// Inline mode
	return (
		<div className="cal-embed-container">
			<Cal
				calLink={calLink}
				config={calConfig}
				style={{
					width: '100%',
					height: '100%',
					border: 'none',
				}}
			/>
		</div>
	)
}

export default CalEmbed
