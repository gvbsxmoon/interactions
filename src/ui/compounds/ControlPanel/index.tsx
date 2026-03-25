import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { Box, AnimatedText, Toggle, Stepper, Loader } from '@/ui/primitives';
import { ChevronsUpDown, Droplets, Minus, Plus, Snowflake, Sun } from 'lucide-react';

import { cssVar } from '@/lib/utils';
import css from './ControlPanel.module.css';

/* AC MODE */
const acModes = [
	{ id: 'heat', icon: Sun, color: '#F59E0B' },
	{ id: 'cool', icon: Snowflake, color: '#3B82F6' },
	{ id: 'dry', icon: Droplets, color: '#06B6D4' },
] as const;

type AcMode = (typeof acModes)[number]['id'];

function AcModePane() {
	const [acMode, setAcMode] = useState<AcMode>('cool');

	return (
		<div className={css.acModes}>
			{acModes.map(({ id, icon: Icon, color }) => (
				<button key={id} className={css.acModeButton} onClick={() => setAcMode(id)}>
					{acMode === id && (
						<motion.div className={css.acModeIndicator} layoutId='acModeIndicator' transition={{ type: 'spring', stiffness: 400, damping: 40 }} />
					)}
					<Icon size={18} strokeWidth={2} color={acMode === id ? color : cssVar('icon')} style={{ position: 'relative' }} />
				</button>
			))}
		</div>
	);
}

const blurInVariant: Variants = {
	initial: {
		height: 0,
		filter: 'blur(16px)',
		opacity: 0,
	},
	animate: {
		height: 'auto',
		opacity: 1,
		filter: 'blur(0px)',
		transition: {
			type: 'spring',
			stiffness: 150,
			damping: 18,
		},
	},
	exit: {
		height: 0,
		opacity: 0,
		filter: 'blur(8px)',
		transition: {
			type: 'spring',
			stiffness: 150,
			damping: 18,
		},
	},
};

export function ControlPanel() {
	const [active, setActive] = useState<boolean>(false);
	const [temperature, setTemperature] = useState<number>(22);
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
					<Toggle checked={active} onChange={setActive} />
				</div>

				<div className={css.temperature}>
					<button className={css.temperatureButton} onClick={() => setTemperature(temp => temp - 1)} disabled={temperature <= 16 || !active}>
						<Minus strokeWidth={3} size={16} />
					</button>
					<AnimatedText text={`${temperature}°`} className={css.temperatureLabel} />
					<button className={css.temperatureButton} onClick={() => setTemperature(temp => temp + 1)} disabled={temperature >= 30 || !active}>
						<Plus strokeWidth={3} size={16} />
					</button>
				</div>

				<AnimatePresence>
					{active && (
						<motion.div className={css.settings} variants={blurInVariant} {...blurInVariant} style={{ overflow: 'hidden' }}>
							<div className={css.mode} onClick={changeMode}>
								<AnimatedText stagger={0.02} text={mode} />
								<ChevronsUpDown size={14} />
							</div>
							<AnimatePresence>
								{mode === 'Manual' && (
									<motion.div className={css.manualSettings} {...blurInVariant} style={{ overflow: 'hidden' }}>
										<AcModePane />
										<div className={css.fanSpeed}>
											Fan speed
											<Stepper />
										</div>
										<AnimatePresence>
											<button className={css.button}>
												<Loader />
												Apply changes
											</button>
										</AnimatePresence>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</Box>
	);
}
