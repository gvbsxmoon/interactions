import css from './Box.module.css';

export function Box({ children }: React.PropsWithChildren) {
	return <div className={css.layout}>{children}</div>;
}
