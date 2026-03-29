import { useState } from 'react';
import { motion, type Transition } from 'motion/react';
import { Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn, cssVar } from '@/lib/utils';
import { BrowserShell, Collapsible } from '@/ui/primitives';

import css from './Sidebar.module.css';

const defaultComponentTransition: Transition = { type: 'spring', stiffness: 300, damping: 30 };

function SidebarColumn({ label, items, selected, onSelect }: { label: string; items: unknown[]; selected: number; onSelect: (index: number) => void }) {
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<div className={css.sidebarColumn} onMouseLeave={() => setHovered(null)}>
			{items.map((_, i) => (
				<div key={i} className={css.sidebarRow} onMouseEnter={() => setHovered(i)} onClick={() => onSelect(i)}>
					{hovered === i && <motion.div layoutId='hoverIndicator' className={css.sidebarRowOverlay} transition={defaultComponentTransition} />}
					{selected === i && <motion.div layoutId='activeIndicator' className={css.sidebarRowOverlay} transition={defaultComponentTransition} />}
					<span className={cn(selected === i && css.sidebarRowSelected)}>
						{label} {i + 1}
					</span>
				</div>
			))}
		</div>
	);
}

export function Sidebar() {
	const [open, setOpen] = useState(false);

	const [selected, setSelected] = useState<number>(0);

	return (
		<BrowserShell>
			<div>
				<motion.button
					className={cn(css.sidebarIcon, open && css.open)}
					onClick={() => setOpen(prev => !prev)}
					animate={{ opacity: open ? 1 : 0, x: open ? 164 : 0 }}
					transition={defaultComponentTransition}>
					<Plus size={16} color={cssVar('icon')} />
				</motion.button>
				<motion.button
					className={cn(css.sidebarIcon, open && css.open)}
					onClick={() => setOpen(prev => !prev)}
					animate={{ x: open ? 192 : 0 }}
					transition={defaultComponentTransition}>
					{open ? <PanelLeftClose size={16} color={cssVar('icon')} /> : <PanelLeftOpen size={16} color={cssVar('icon')} />}
				</motion.button>
			</div>

			<Collapsible open={open} blur direction='horizontal' className={css.sidebar} padding={6}>
				<SidebarColumn label='Canvas' items={Array.from({ length: 5 })} selected={selected} onSelect={setSelected} />
			</Collapsible>
		</BrowserShell>
	);
}
