import { type ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Loader } from '@/ui/primitives';
import css from './Button.module.css';

type AsyncPhase = 'idle' | 'loading' | 'done';

const transition = { type: 'spring' as const, stiffness: 300, damping: 25 };

const phaseVariants = {
	initial: { opacity: 0, scale: 0.6, filter: 'blur(4px)' },
	animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition },
	exit: { opacity: 0, scale: 0.6, filter: 'blur(4px)', transition: { duration: 0.15 } },
};

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	async?: boolean;
	onAsyncComplete?: () => void;
};

export function Button({ children, onClick, className, async: withAsync = false, onAsyncComplete }: ButtonProps) {
	const [phase, setPhase] = useState<AsyncPhase>('idle');

	const handleClick = () => {
		if (!withAsync) {
			onClick?.();
			return;
		}

		if (phase !== 'idle') return;

		onClick?.();
		setPhase('loading');

		setTimeout(() => {
			setPhase('done');
			setTimeout(() => {
				setPhase('idle');
				onAsyncComplete?.();
			}, 800);
		}, 1500);
	};

	return (
		<button className={cn(css.button, className)} onClick={handleClick} disabled={withAsync && phase !== 'idle'}>
			<AnimatePresence mode='wait'>
				{phase === 'idle' && (
					<motion.div key='idle' className={css.content} variants={phaseVariants} initial='initial' animate='animate' exit='exit'>
						{children}
					</motion.div>
				)}
				{phase === 'loading' && (
					<motion.div key='loading' className={css.content} variants={phaseVariants} initial='initial' animate='animate' exit='exit'>
						<Loader color='white' />
					</motion.div>
				)}
				{phase === 'done' && (
					<motion.div key='done' className={css.content} variants={phaseVariants} initial='initial' animate='animate' exit='exit'>
						<Check size={14} strokeWidth={3} />
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
}
