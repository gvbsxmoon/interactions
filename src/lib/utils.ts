export function cssVar(variable: string) {
	const name = variable.startsWith('--') ? variable : `--${variable}`;
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
