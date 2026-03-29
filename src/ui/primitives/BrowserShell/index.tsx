import { Box } from '@/ui/primitives';

import css from './Sidebar.module.css';

const windowButtonColors = ['rgb(253, 94, 86)', 'rgb(250, 189, 64)', 'rgb(34, 200, 65)'] as const;

function BroswserWindowButton({ backgroundColor }: { backgroundColor: string }) {
	return <div className={css.browserButton} style={{ backgroundColor }} />;
}

export function BrowserShell({ children }: React.PropsWithChildren) {
	return (
		<Box>
			<div className={css.browser}>
				<div className={css.browserHeader}>
					{windowButtonColors.map((c, i) => (
						<BroswserWindowButton key={i} backgroundColor={c} />
					))}
					<p>ntlu.dev</p>
				</div>

				{children}
			</div>
		</Box>
	);
}
