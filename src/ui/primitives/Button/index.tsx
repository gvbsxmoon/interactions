import { type ComponentProps, type ReactNode, type RefObject, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

import css from './Button.module.css';
import { type LoaderComponent } from '../Loader';

type AsyncPhase = 'idle' | 'loading' | 'done';
type ButtonVariant = 'default' | 'light';

const DONE_DISPLAY_MS = 800;

const popTransition = { type: 'spring' as const, stiffness: 300, damping: 25 };

const phaseAnimations = {
	pop: {
		initial: { opacity: 0, scale: 0.6, filter: 'blur(4px)' },
		animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: popTransition },
		exit: { opacity: 0, scale: 0.6, filter: 'blur(4px)', transition: { duration: 0.15 } },
	},
	slide: {
		initial: { opacity: 0, x: 20 },
		animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
		exit: { opacity: 0, x: -20, transition: { duration: 0.15, ease: 'easeIn' } },
	},
} as const;

const accentByVariant = {
	default: 'white',
	light: 'black',
} as const;

type PhaseAnimation = keyof typeof phaseAnimations;

type ButtonProps = {
	children: ReactNode;
	ref?: RefObject<HTMLButtonElement | null>;
	onClick?: () => void;
	className?: string;
	variant?: ButtonVariant;
	phaseAnimation?: PhaseAnimation;
	async?: boolean;
	asyncDuration?: number;
	onAsyncComplete?: () => void;
	loader: LoaderComponent;
	animate?: ComponentProps<typeof motion.button>['animate'];
	transition?: ComponentProps<typeof motion.button>['transition'];
};

export function Button({
	children,
	ref,
	onClick,
	className,
	variant = 'default',
	phaseAnimation = 'pop',
	async: isAsync = false,
	asyncDuration = 1500,
	onAsyncComplete,
	loader: Loader,
	animate,
	transition,
}: ButtonProps) {
	const [phase, setPhase] = useState<AsyncPhase>('idle');
	const accent = accentByVariant[variant];
	const variants = phaseAnimations[phaseAnimation];
	const busy = isAsync && phase !== 'idle';

	const handleClick = () => {
		onClick?.();

		if (!isAsync || phase !== 'idle') return;

		setPhase('loading');
		setTimeout(() => {
			setPhase('done');
			setTimeout(() => {
				setPhase('idle');
				onAsyncComplete?.();
			}, DONE_DISPLAY_MS);
		}, asyncDuration);
	};

	return (
		<motion.button
			ref={ref}
			className={cn(css.button, variant !== 'default' && css[variant], className)}
			onClick={handleClick}
			disabled={busy}
			animate={animate}
			transition={transition}>
			<AnimatePresence mode='wait'>
				{phase === 'idle' && (
					<PhaseContent key='idle' variants={variants}>
						{children}
					</PhaseContent>
				)}
				{phase === 'loading' && (
					<PhaseContent key='loading' variants={variants}>
						<Loader duration={asyncDuration} />
					</PhaseContent>
				)}
				{phase === 'done' && (
					<PhaseContent key='done' variants={variants}>
						<Check size={14} strokeWidth={3} color={accent} />
					</PhaseContent>
				)}
			</AnimatePresence>
		</motion.button>
	);
}

function PhaseContent({ children, variants }: { children: ReactNode; variants: (typeof phaseAnimations)[keyof typeof phaseAnimations] }) {
	return (
		<motion.div className={css.content} variants={variants} initial='initial' animate='animate' exit='exit'>
			{children}
		</motion.div>
	);
}
