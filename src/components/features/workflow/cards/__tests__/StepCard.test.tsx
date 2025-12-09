import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import StepCard from '../StepCard'

describe('StepCard', () => {
	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})
	const defaultProps = {
		stepKey: 'discovery',
		index: 0,
		number: '01',
		title: 'Discovery & Strategy',
		description: 'We dive deep into your business goals',
		stepLabel: 'Step',
	}

	it('should render step card with correct content', () => {
		render(<StepCard {...defaultProps} />)

		expect(screen.getByText('Discovery & Strategy')).toBeInTheDocument()
		expect(
			screen.getByText('We dive deep into your business goals'),
		).toBeInTheDocument()
	})

	it('should render step label with number', () => {
		render(<StepCard {...defaultProps} />)

		const stepLabelElement = screen.getByText(/Step/)
		expect(stepLabelElement).toBeInTheDocument()
		// StepCard uses stepNumber (1) not number prop ('01')
		expect(stepLabelElement.textContent).toContain('1')
	})

	it('should call onExpand when card is clicked', () => {
		const onExpand = vi.fn()
		const { container } = render(
			<StepCard {...defaultProps} onExpand={onExpand} />,
		)

		const cardElement = container.firstChild as HTMLElement
		cardElement.click()

		expect(onExpand).toHaveBeenCalledOnce()
	})

	it('should render description', () => {
		render(<StepCard {...defaultProps} />)

		// Description is visible on large screens (hidden on md via Tailwind)
		const description = screen.queryByText(
			'We dive deep into your business goals',
		)
		expect(description).toBeInTheDocument()
	})

	it('should have glassmorphic styling', () => {
		const { container } = render(<StepCard {...defaultProps} />)

		const cardElement = container.firstChild as HTMLElement

		// Check for glassmorphic classes
		expect(cardElement.className).toContain('backdrop-blur')
		expect(cardElement.className).toContain('border')
	})

	it('should adapt to container height via SVG zones', () => {
		const { container } = render(<StepCard {...defaultProps} />)

		const cardElement = container.firstChild as HTMLElement

		// Verify card uses glassmorphic styling (inherits height from parent)
		expect(cardElement.className).toContain('backdrop-blur')
		expect(cardElement.className).toContain('border')

		// Card should NOT have fixed height classes (adapts to SVG container)
		expect(cardElement.className).not.toContain('h-[var(--card-height')
	})
})
