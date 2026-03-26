import { motion } from 'motion/react';
import { useRef, useState } from 'react';

import css from './Stepper.module.css';
import { AnimatedText } from '@/ui/primitives';

type StepperProps = {
	steps?: number;
	current: number;
	onChange: (current: number) => void;
};

export function Stepper({ steps = 3, current, onChange }: StepperProps) {
	const trackRef = useRef<HTMLDivElement>(null);

	// avoid external state triggering until the pointer hasn't released
	const [internalStep, setInternalStep] = useState(current);

	const getStep = (clientX: number) => {
		const track = trackRef.current;
		if (!track) return 1;

		const rect = track.getBoundingClientRect();
		const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
		const ratio = x / rect.width;

		const stepIndex = Math.min(Math.ceil(ratio * steps), steps);
		return Math.max(stepIndex, 1);
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		const track = trackRef.current;
		if (!track) return;

		track.setPointerCapture(e.pointerId);
		setInternalStep(getStep(e.clientX));
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		const track = trackRef.current;
		if (!track) return;

		if (track.hasPointerCapture(e.pointerId)) {
			setInternalStep(getStep(e.clientX));
		}
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		const track = trackRef.current;
		if (!track) return;

		if (track.hasPointerCapture(e.pointerId)) {
			onChange(internalStep);
			track.releasePointerCapture(e.pointerId);
		}
	};

	const fillerWidth = (internalStep / 3) * 100;

	return (
		<div className={css.stepper} ref={trackRef} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerMove={handlePointerMove}>
			<motion.div className={css.stepperFill} animate={{ width: `${fillerWidth}%` }} transition={{ type: 'spring', stiffness: 400, damping: 40 }}>
				<AnimatedText text={internalStep.toString()} />
			</motion.div>
		</div>
	);
}
