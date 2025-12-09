import { GitBranch } from 'lucide-react'

import BentoCard from './BentoCard'
import InfiniteMarquee from './InfiniteMarquee'

interface BentoDevToolsProps {
	readonly data: {
		readonly title: string
		readonly items: readonly string[]
	}
}

/**
 * Developer tools section for Bento grid
 * Displays tools in a horizontal marquee
 */
const BentoDevTools = ({ data }: BentoDevToolsProps) => {
	return (
		<BentoCard>
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<GitBranch className="text-brand-blue h-6 w-6" />
					<h3 className="text-xl font-bold text-white">
						{data.title}
					</h3>
				</div>
				<InfiniteMarquee items={data.items} />
			</div>
		</BentoCard>
	)
}

export default BentoDevTools
