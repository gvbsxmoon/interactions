export function cn(...args: (string | false | undefined | null)[]) {
	return args.filter(Boolean).join(' ');
}

export function cssVar(variable: string) {
	const name = variable.startsWith('--') ? variable : `--${variable}`;
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
