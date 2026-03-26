import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import css from './AnimatedText.module.css';

type AnimatedTextProps = {
	text: string;
	className?: string;
	stagger?: number;
};

export function AnimatedText({ text, className, stagger = 0.08 }: AnimatedTextProps) {
	const splittedText = text.split('');

	return (
		<div key={text} className={cn(css.container, className)}>
			{splittedText.map((current, i) => {
				return (
					<motion.div
						key={i}
						initial={{ y: 4, opacity: 0, filter: 'blur(2px)' }}
						animate={{
							y: 0,
							opacity: 1,
							filter: 'blur(0)',
							transition: { delay: i * stagger },
						}}>
						{current === ' ' ? <span>&nbsp;</span> : current}
					</motion.div>
				);
			})}
		</div>
	);
}
