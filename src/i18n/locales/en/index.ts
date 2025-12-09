import { common } from './common'
import { footer } from './components/footer'
import { error } from './pages/error'
import { home } from './pages/home'
import { pricing } from './pages/pricing'
import { privacy } from './pages/privacy'
import { terms } from './pages/terms'
import { workflow } from './pages/workflow'

export const en = {
	common,
	home,
	workflow,
	pricing,
	privacy,
	terms,
	error,
	footer,
} as const
