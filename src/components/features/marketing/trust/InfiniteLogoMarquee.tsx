import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface Client {
	name: string
	logo: string
	alt: string
}

interface InfiniteLogoMarqueeProps {
	clients: Client[]
	speed?: 'slow' | 'normal' | 'fast'
	pauseOnHover?: boolean
	className?: string
}

export default function InfiniteLogoMarquee({
	clients,
	speed = 'normal',
	pauseOnHover = true,
	className,
}: InfiniteLogoMarqueeProps) {
	// Speed configuration in seconds
	const speedConfig = {
		slow: 60,
		normal: 40,
		fast: 20,
	}

	const duration = speedConfig[speed]

	// Duplicate clients for seamless loop
	const duplicatedClients = [...clients, ...clients, ...clients]

	return (
		<div
			className={cn('relative w-full overflow-hidden py-4', className)}
			style={{
				maskImage:
					'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
				WebkitMaskImage:
					'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
			}}
		>
			{/* Scrolling container */}
			<motion.div
				className="flex gap-8 md:gap-12"
				animate={{
					x: [0, `${-100 / 3}%`],
				}}
				transition={{
					x: {
						repeat: Number.POSITIVE_INFINITY,
						repeatType: 'loop',
						duration: duration,
						ease: 'linear',
					},
				}}
			>
				{duplicatedClients.map((client, index) => (
					<motion.div
						key={`${client.name}-${index}`}
						className="flex-shrink-0"
						style={{ perspective: '1000px' }}
						whileHover={
							pauseOnHover
								? {
										scale: 1.05,
										rotateY: 5,
										z: 50,
										transition: {
											type: 'spring',
											stiffness: 300,
											damping: 20,
										},
									}
								: undefined
						}
					>
						<div
							className={cn(
								'relative',
								'rounded-xl p-4 md:p-6',
								'bg-white/60 backdrop-blur-sm',
								'border border-gray-200/50',
								'shadow-sm',
								'transition-all duration-300',
								'hover:border-gray-300/50 hover:bg-white hover:shadow-xl',
								'transform-gpu',
							)}
						>
							{/* Logo */}
							<div className="h-16 w-40 md:h-20 md:w-48">
								<img
									src={client.logo}
									alt={client.alt}
									loading="lazy"
									className={cn(
										'h-full w-full object-contain',
										'transition-all duration-300',
										'opacity-60 grayscale',
										'hover:opacity-100 hover:grayscale-0',
									)}
								/>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	)
}
