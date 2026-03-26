import { useState } from 'react';
import { motion } from 'motion/react';
import { Box, AnimatedText, Toggle, Stepper, Collapsible, Button } from '@/ui/primitives';
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

function AcModePane({ acMode, onAcModeChange }: { acMode: AcMode; onAcModeChange: (current: AcMode) => void }) {
	return (
		<div className={css.acModes}>
			{acModes.map(({ id, icon: Icon, color }) => (
				<button key={id} className={css.acModeButton} onClick={() => onAcModeChange(id)}>
					{acMode === id && (
						<motion.div className={css.acModeIndicator} layoutId='acModeIndicator' transition={{ type: 'spring', stiffness: 400, damping: 40 }} />
					)}
					<Icon size={18} strokeWidth={2} color={acMode === id ? color : cssVar('icon')} style={{ position: 'relative' }} />
				</button>
			))}
		</div>
	);
}

type SettingsMode = 'Automatic' | 'Manual';

export function ControlPanel() {
	const [active, setActive] = useState(false);
	const [fanSpeed, setFanSpeed] = useState(1);
	const [temperature, setTemperature] = useState(22);
	const [acMode, setAcMode] = useState<AcMode>('cool');
	const [mode, setMode] = useState<SettingsMode>('Automatic');
	const [isDirty, setIsDirty] = useState(false);

	const handleAcModeChange = (m: AcMode) => {
		setAcMode(m);
		setIsDirty(true);
	};
	const handleFanSpeedChange = (s: number) => {
		setFanSpeed(s);
		setIsDirty(true);
	};
	const applySettings = () => setIsDirty(false);
	const decrementTemp = () => setTemperature(t => t - 1);
	const incrementTemp = () => setTemperature(t => t + 1);
	const changeMode = () => setMode(m => (m === 'Automatic' ? 'Manual' : 'Automatic'));

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

				{/* temperature control */}
				<div className={css.temperature}>
					<button className={css.temperatureButton} onClick={decrementTemp} disabled={temperature <= 16 || !active}>
						<Minus strokeWidth={3} size={16} />
					</button>
					<AnimatedText text={`${temperature}°`} className={css.temperatureLabel} />
					<button className={css.temperatureButton} onClick={incrementTemp} disabled={temperature >= 30 || !active}>
						<Plus strokeWidth={3} size={16} />
					</button>
				</div>

				<Collapsible open={active} className={css.settings} margin={10} blur>
					{/* settings mode handler */}
					<div className={css.mode} onClick={changeMode}>
						<AnimatedText stagger={0.02} text={mode} />
						<ChevronsUpDown size={14} />
					</div>

					{/* manual settings panel */}
					<Collapsible open={mode === 'Manual'} className={css.manualSettings} margin={4} padding={6} blur>
						<AcModePane acMode={acMode} onAcModeChange={handleAcModeChange} />
						<div className={css.fanSpeed}>
							Fan speed
							<Stepper current={fanSpeed} onChange={handleFanSpeedChange} />
						</div>
						<Collapsible open={isDirty} margin={10} blur>
							<Button async onAsyncComplete={applySettings}>
								Apply
							</Button>
						</Collapsible>
					</Collapsible>
				</Collapsible>
			</div>
		</Box>
	);
}
