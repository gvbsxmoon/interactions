import { useState } from 'react';
import { Plus, Image, Video, Music, FileBarChart, BookOpen, Rotate3D } from 'lucide-react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Box } from '../../primitives/Box';
import css from './FanMenu.module.css';
import { cssVar } from '../../../lib/utils';

type ChipsProps = {
	label: string;
	icon: React.ReactNode;
};

const menuData: ChipsProps[] = [
	{
		label: 'Document',
		icon: <FileBarChart size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Learning',
		icon: <BookOpen size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Music',
		icon: <Music size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Image',
		icon: <Image size={16} strokeWidth={2.5} />,
	},
	{
		label: 'Video',
		icon: <Video size={16} strokeWidth={2.5} />,
	},
];

const positions = menuData.map((_, i) => {
	const angle = -90 + (i / (menuData.length - 1)) * 90;
	const rad = (angle * Math.PI) / 180;
	return {
		x: -i * 16 * Math.cos(rad),
		y: i * -48 - 64 - Math.sin(rad),
		// rotate: (angle + 30) * i / 180,
	};
});

export function FanMenu() {
	const controls = useAnimation();
	const [isOpen, setIsOpen] = useState(false);

	async function handleClick() {
		const open = !isOpen;
		setIsOpen(open);

		await controls.start({
			scale: 1.15,
			boxShadow: cssVar('shadow-md'),
			transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
		});

		await controls.start({
			scale: 1,
			rotate: open ? -45 : 0,
			boxShadow: cssVar('shadow-sm'),
			transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
		});
	}

	return (
		<Box>
			<div className={css.container}>
				<AnimatePresence>
					{isOpen &&
						menuData.map((e, i) => (
							<motion.div
								key={e.label}
								className={css.chips}
								initial={{ opacity: 0, x: 0, y: 0 }}
								animate={{
									opacity: 1,
									x: positions[i].x,
									y: positions[i].y,
									// rotate: positions[i].rotate,
									transition: {
										delay: (menuData.length - 1 - i) * 0.06,
										duration: 0.45,
										ease: [0.16, 1, 0.3, 1],
									},
								}}
								exit={{
									opacity: 0,
									x: 0,
									y: 0,
									transition: {
										delay: i * 0.04,
										duration: 0.25,
										ease: [0.4, 0, 1, 1],
									},
								}}>
								{e.icon}
								{e.label}
							</motion.div>
						))}
				</AnimatePresence>
				<motion.div className={css.plusButton} animate={controls} onClick={handleClick} style={{ cursor: 'pointer' }}>
					<Plus strokeWidth={3} />
				</motion.div>
			</div>
		</Box>
	);
}
