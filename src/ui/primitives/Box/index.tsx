import css from './Box.module.css';

type BoxProps = React.PropsWithChildren<{ ref?: React.Ref<HTMLDivElement> }>;

export function Box({ ref, children }: BoxProps) {
	return (
		<div ref={ref} className={css.layout}>
			{children}
		</div>
	);
}
