import { useRef, useState } from 'react';
import { Plus, Image, Music, FileBarChart, BookOpen } from 'lucide-react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Box } from '@/ui/primitives';
import css from './FanMenu.module.css';
import { cssVar } from '../../../lib/utils';

type MenuData = {
	label: string;
	icon: React.ReactNode;
};

const menuData: MenuData[] = [
	{
		label: 'Documents',
		icon: <FileBarChart size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Research',
		icon: <BookOpen size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Music',
		icon: <Music size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Pictures',
		icon: <Image size={16} strokeWidth={2.5} />,
	},
];

export function FanMenu() {
	const controls = useAnimation();

	const containerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	async function handleClick() {
		const open = !isOpen;
		setIsOpen(open);

		await controls.start({
			scale: 1.1,
			boxShadow: cssVar('shadow-md'),
			transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] },
		});

		await controls.start({
			scale: 1,
			rotate: open ? -45 : 0,
			boxShadow: cssVar('shadow-sm'),
			transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
		});
	}

	const positions = menuData.map((_, i) => {
		if (!buttonRef || !buttonRef.current || !containerRef || !containerRef.current) return;

		const b = buttonRef.current;
		const c = containerRef.current;

		const bx = c.offsetWidth / 2 - b.offsetWidth / 2;
		const by = 48 + b.offsetHeight / 2;
		const radius = Math.sqrt(bx * bx + by * by);
		const buttonAngle = Math.atan2(by, bx);

		const endAngle = 80 * (Math.PI / 180);

		const angle_i = i * ((endAngle - buttonAngle) / (menuData.length - 1));

		const chipX = radius * Math.cos(angle_i);
		const chipY = radius * Math.sin(angle_i);

		return {
			x: chipX - bx + b.offsetWidth / 3,
			y: -chipY - b.offsetHeight - 12,
			rotate: -((angle_i * 180) / Math.PI) * 0.3,
		};
	});

	return (
		<>
			<Box ref={containerRef}>
				<AnimatePresence>
					{isOpen &&
						menuData.map((e, i) => (
							<motion.div
								key={e.label}
								className={css.chips}
								whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 150, damping: 10 } }}
								initial={{
									filter: 'blur(16px)',
									opacity: 0,
									x: 0,
									y: 0,
									rotate: 0,
								}}
								animate={{
									opacity: 1,
									filter: 'blur(0px)',
									x: positions[i]?.x,
									y: positions[i]?.y,
									rotate: positions[i]?.rotate,
									transition: {
										type: 'spring',
										stiffness: 150,
										damping: 18,
									},
								}}
								exit={{
									opacity: 0,
									x: 0,
									y: 0,
									filter: 'blur(8px)',
									transition: {
										duration: 0.25,
										ease: [0.4, 0, 1, 1],
									},
								}}>
								{e.icon}
								{e.label}
							</motion.div>
						))}
				</AnimatePresence>
				<motion.div ref={buttonRef} className={css.plusButton} animate={controls} onClick={handleClick}>
					<Plus strokeWidth={3} />
				</motion.div>
			</Box>
		</>
	);
}
