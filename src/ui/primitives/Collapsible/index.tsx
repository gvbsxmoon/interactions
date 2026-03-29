import { type ReactNode } from 'react';
import { type Transition, motion } from 'motion/react';
import { cn } from '@/lib/utils';

import css from './Collapsible.module.css';

type CollapsibleDirection = 'vertical' | 'horizontal';

type CollapsibleProps = {
	open: boolean;
	children: ReactNode;
	direction?: CollapsibleDirection;
	className?: string;
	marginTop?: number;
	marginLeft?: number;
	padding?: number;
	blur?: boolean;
	transition?: Transition;
};

const defaultTransition: Transition = { type: 'spring', stiffness: 150, damping: 18 };
const verticalGridAnimation = (open: boolean) => ({ gridTemplateRows: open ? '1fr' : '0fr' });
const horizontalGridAnimation = (open: boolean) => ({ gridTemplateColumns: open ? '1fr' : '0fr' });

export function Collapsible({
	open,
	children,
	direction = 'vertical',
	className,
	marginTop = 0,
	marginLeft = 0,
	padding = 0,
	blur = false,
	transition = defaultTransition,
}: CollapsibleProps) {
	const isVertical = direction === 'vertical';
	const gridAnimation = isVertical ? verticalGridAnimation(open) : horizontalGridAnimation(open);

	return (
		<motion.div
			className={cn(css.grid, isVertical ? css.gridVertical : css.gridHorizontal)}
			animate={{ ...gridAnimation, marginTop: open ? marginTop : 0, marginLeft: open ? marginLeft : 0 }}
			transition={transition}>
			<motion.div
				className={cn(css.content, isVertical ? css.contentVertical : css.contentHorizontal, className)}
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
