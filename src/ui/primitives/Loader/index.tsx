import { cn, cssVar } from '@/lib/utils';
import { motion } from 'motion/react';
import css from './Loader.module.css';

type LoaderProps = {
	color?: 'white' | 'black';
	className?: string;
};

export function Loader({ color = 'white', className }: LoaderProps) {
	const bg = color === 'white' ? cssVar('bg') : cssVar('text');

	return (
		<motion.div
			className={cn(css.loader, className)}
			style={{
				backgroundColor: bg,
				boxShadow: `0 0 6px 2px color-mix(in srgb, ${bg} 30%, transparent)`,
			}}
			initial={{ scale: 0, opacity: 0, filter: 'blur(4px)' }}
			animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
		/>
	);
}
