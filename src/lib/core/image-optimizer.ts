import { getImage } from 'astro:assets'

import type { ImageMetadata } from 'astro'

export interface OptimizedImage {
	src: string
	width: number
	height: number
	format: string
}

async function handleSVG(image: ImageMetadata): Promise<OptimizedImage> {
	return {
		src: image.src,
		width: image.width,
		height: image.height,
		format: 'svg',
	}
}

async function handlePNG(image: ImageMetadata): Promise<OptimizedImage> {
	const optimized = await getImage({
		src: image,
		format: 'png',
		quality: 100,
	})

	return {
		src: optimized.src,
		width: optimized.options.width ?? image.width,
		height: optimized.options.height ?? image.height,
		format: 'png',
	}
}

async function handleWebP(image: ImageMetadata): Promise<OptimizedImage> {
	const optimized = await getImage({
		src: image,
		format: 'webp',
		quality: 90,
	})

	return {
		src: optimized.src,
		width: optimized.options.width ?? image.width,
		height: optimized.options.height ?? image.height,
		format: 'webp',
	}
}

export async function optimizeImages<T extends Record<string, ImageMetadata>>(
	images: T,
): Promise<{ [K in keyof T]: OptimizedImage }> {
	const entries = Object.entries(images)

	const results = await Promise.allSettled(
		entries.map(async ([key, image]) => {
			switch (image.format) {
				case 'svg':
					return { key, optimized: await handleSVG(image) }
				case 'png':
					return { key, optimized: await handlePNG(image) }
				default:
					return { key, optimized: await handleWebP(image) }
			}
		}),
	)

	const hasErrors = results.some(r => r.status === 'rejected')
	if (hasErrors) {
		const errors = results.reduce<string[]>((acc, r) => {
			if (r.status === 'rejected') {
				acc.push(
					r.reason instanceof Error
						? r.reason.message
						: String(r.reason),
				)
			}
			return acc
		}, [])

		throw new Error(
			`Failed to optimize ${errors.length} image(s):\n${errors.map((e, i) => `  ${i + 1}. ${e}`).join('\n')}`,
		)
	}

	return Object.fromEntries(
		results
			.filter(
				(
					r,
				): r is PromiseFulfilledResult<{
					key: string
					optimized: OptimizedImage
				}> => r.status === 'fulfilled',
			)
			.map(r => [r.value.key, r.value.optimized]),
	) as { [K in keyof T]: OptimizedImage }
}
