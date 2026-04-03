import { cssVar } from '@/lib/utils';
import css from './Box.module.css';

type BoxProps = React.PropsWithChildren<{ ref?: React.Ref<HTMLDivElement>; enhanceContrast?: boolean }>;

export function Box({ ref, enhanceContrast = false, children }: BoxProps) {
	const backgroundColor = enhanceContrast ? cssVar('surface') : cssVar('bg');

	return (
		<div ref={ref} className={css.layout} style={{ backgroundColor }}>
			{children}
		</div>
	);
}
