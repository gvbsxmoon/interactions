import type { RefObject } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import css from './TextInput.module.css';
import { cn } from '@/lib/utils';

export function TextInput({
	ref,
	className,
	...rest
}: {
	ref?: RefObject<HTMLInputElement | null>;
} & HTMLMotionProps<'input'>) {
	return <motion.input ref={ref} className={cn(css.input, className)} {...rest} />;
}
