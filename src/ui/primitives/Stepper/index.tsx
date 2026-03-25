import { motion } from 'motion/react';
import { useRef, useState } from 'react';

import css from './Stepper.module.css';
import { AnimatedText } from '@/ui/primitives';

type StepperProps = {
	steps?: number;
};

export function Stepper({ steps = 3 }: StepperProps) {
	const [step, setStep] = useState(1);

	const trackRef = useRef<HTMLDivElement>(null);

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
		setStep(getStep(e.clientX));
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		const track = trackRef.current;
		if (!track) return;

		if (track.hasPointerCapture(e.pointerId)) {
			setStep(getStep(e.clientX));
		}
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		const track = trackRef.current;
		if (!track) return;

		if (track.hasPointerCapture(e.pointerId)) {
			track.releasePointerCapture(e.pointerId);
		}
	};

	const fillerWidth = (step / 3) * 100;

	return (
		<div className={css.stepper} ref={trackRef} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerMove={handlePointerMove}>
			<motion.div className={css.stepperFill} animate={{ width: `${fillerWidth}%` }} transition={{ type: 'spring', stiffness: 400, damping: 40 }}>
				<AnimatedText text={step.toString()} />
			</motion.div>
		</div>
	);
}
