import css from './Toggle.module.css';

type ToggleProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export function Toggle({ checked, onChange }: ToggleProps) {
	return (
		<label className={css.container}>
			<input type='checkbox' checked={checked} onChange={() => onChange(!checked)} />
			<span className={css.toggle}></span>
		</label>
	);
}
