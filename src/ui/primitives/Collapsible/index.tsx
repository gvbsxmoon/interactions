import { type ReactNode } from 'react';
import { type Transition, motion } from 'motion/react';

import css from './Collapsible.module.css';
import { cn } from '@/lib/utils';

type CollapsibleProps = {
	open: boolean;
	children: ReactNode;
	className?: string;
	margin?: number;
	padding?: number;
	blur?: boolean;
	transition?: Transition;
};

const defaultTransition: Transition = { type: 'spring', stiffness: 150, damping: 18 };

export function Collapsible({ open, children, className, margin = 0, padding = 0, blur = false, transition = defaultTransition }: CollapsibleProps) {
	return (
		<motion.div className={css.grid} animate={{ gridTemplateRows: open ? '1fr' : '0fr', marginTop: open ? margin : 0 }} transition={transition}>
			<motion.div
				className={cn(css.content, className)}
				animate={{
					opacity: open ? 1 : 0,
					...(blur && { filter: open ? 'blur(0px)' : 'blur(8px)' }),
					...(padding && { padding: open ? padding : 0 }),
				}}
				transition={transition}>
				{children}
			</motion.div>
		</motion.div>
	);
}
