import { cn, cssVar } from '@/lib/utils';
import { motion } from 'motion/react';
import css from './Loader.module.css';

type LoaderColor = 'white' | 'black';

type PulseProps = {
	color?: LoaderColor;
	className?: string;
};

type SpinnerProps = {
	color?: LoaderColor;
	size?: number;
	className?: string;
};

type ProgressBarProps = {
	color?: LoaderColor;
	duration?: number;
	className?: string;
};

type BaseLoaderProps = {
	color?: LoaderColor;
	className?: string;
	duration?: number;
};

function Pulse({ color = 'white', className }: PulseProps) {
	const bg = color === 'white' ? cssVar('bg') : cssVar('text');

	return (
		<motion.div
			className={cn(css.pulse, className)}
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

function Spinner({ color = 'white', size = 18, className }: SpinnerProps) {
	const borderColor = color === 'white' ? cssVar('bg') : cssVar('text');

	return (
		<motion.div
			className={cn(css.spinner, className)}
			style={{
				width: size,
				height: size,
				borderColor: borderColor,
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		/>
	);
}

function ProgressBar({ color = 'white', duration, className }: ProgressBarProps) {
	const bg = color === 'white' ? cssVar('bg') : cssVar('text');

	return (
		<motion.div
			className={cn(css.progressBar, className)}
			style={{ backgroundColor: bg }}
			initial={{ width: '0%' }}
			animate={{ width: '100%' }}
			transition={{ duration: (duration ?? 1000) / 1000, ease: 'linear' }}
		/>
	);
}

export type LoaderComponent = React.FC<BaseLoaderProps>;
export class Loader {
	static Pulse =
		(props?: PulseProps): LoaderComponent =>
		baseProps => <Pulse {...baseProps} {...props} />;

	static Spinner =
		(props?: SpinnerProps): LoaderComponent =>
		baseProps => <Spinner {...baseProps} {...props} />;

	static ProgressBar =
		(props?: ProgressBarProps): LoaderComponent =>
		baseProps => <ProgressBar {...baseProps} {...props} />;
}
