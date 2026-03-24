import { Box } from '@primitives/Box';
import css from './ControlPanel.module.css';

function Switch() {
	return (
		<label className={css.switch}>
			<input type='checkbox' />
			<span className={css.slider}></span>
		</label>
	);
}

export function ControlPanel() {
	return (
		<Box>
			<div className={css.container}>
				{/* header */}
				<div className={css.header}>
					<div className={css.headerLabels}>
						<h1>Bedroom</h1>
					</div>
					<Switch />
				</div>

				{/* temperature control */}
				<div className={css.temperature}>
					<div className={css.selector}></div>
				</div>
			</div>
		</Box>
	);
}
