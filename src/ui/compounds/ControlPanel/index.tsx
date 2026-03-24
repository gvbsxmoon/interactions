import { Box } from '@primitives/Box';
import css from './ControlPanel.module.css';
import { ChevronsUpDown, Minus, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';

export function Switch() {
	return (
		<label className={css.switch}>
			<input type='checkbox' />
			<span className={css.slider}></span>
		</label>
	);
}

export function LettersPullUp({ text }: { text: string }) {
	const splittedText = text.split('');

	const pullupVariant = {
		initial: { y: 4, opacity: 0, filter: 'blur(2px)' },
		animate: (i: number) => ({
			y: 0,
			opacity: 1,
			filter: 'blur(0)',
			transition: {
				delay: i * 0.02,
			},
		}),
	};

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<div className={css.lettersPullUp}>
			{splittedText.map((current, i) => (
				<motion.div key={i} ref={ref} variants={pullupVariant} initial='initial' animate={isInView ? 'animate' : ''} custom={i}>
					{current == ' ' ? <span>&nbsp;</span> : current}
				</motion.div>
			))}
		</div>
	);
}

export function ControlPanel() {
	const [mode, setMode] = useState<'Automatic' | 'Manual'>('Automatic');

	const changeMode = () => {
		if (mode === 'Automatic') setMode('Manual');
		if (mode === 'Manual') setMode('Automatic');
	};

	return (
		<Box>
			<div className={css.container}>
				{/* header */}
				<div className={css.header}>
					<div className={css.headerLabels}>
						<h1>Bedroom</h1>
						<p>Air conditioner</p>
					</div>
					<Switch />
				</div>

				<div className={css.temperature}>
					<button className={css.temperatureButton}>
						<Minus strokeWidth={3} size={16} />
					</button>
					<h2>24&#176;</h2>
					<button className={css.temperatureButton}>
						<Plus strokeWidth={3} size={16} />
					</button>
				</div>

				<div className={css.settings}>
					<div className={css.mode} onClick={changeMode}>
						<LettersPullUp key={mode} text={mode} />
						<ChevronsUpDown size={14} />
					</div>
					<div>
						
					</div>
					<div className={css.manualSettings}>
						<div className={css.fanSpeed}>
							Fan speed
							<div className={css.stepper}></div>
						</div>
					</div>
				</div>
			</div>
		</Box>
	);
}
