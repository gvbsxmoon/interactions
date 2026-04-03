import { useRef, useState } from 'react';
import { motion, type Transition } from 'motion/react';
import { BellRing } from 'lucide-react';
import { Box, Button, TextInput } from '@/ui/primitives';
import { cssVar } from '@/lib/utils';

import css from './NotifyMe.module.css';

const defaultComponentTransition: Transition = { type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] };

export function NotifyMe() {
	const [active, setActive] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const handleNotifyMeClick = () => {
		setActive(prev => !prev);

		if (active) {
			if (inputRef?.current) {
				inputRef.current.value = '';
			}
		} else {
			if (inputRef?.current) {
				inputRef.current.focus();
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			buttonRef.current?.click();
		}
	};

	return (
		<Box>
			<div className={css.container}>
				<TextInput
					ref={inputRef}
					placeholder='Email'
					onKeyDown={handleKeyDown}
					animate={{ width: active ? 200 : 0, opacity: active ? 1 : 0, paddingInline: active ? 16 : 0 }}
					transition={defaultComponentTransition}
				/>

				<Button
					ref={buttonRef}
					variant='light'
					className={css.button}
					onClick={handleNotifyMeClick}
					async={active}
					asyncDuration={2000}
					phaseAnimation='slide'
					animate={{
						backgroundColor: active ? cssVar('bg') : cssVar('surface'),
						boxShadow: active ? cssVar('shadow-md') : '0 0px 0px rgba(0,0,0,0)',
						border: active ? `1px solid ${cssVar('border')}` : '1px solid rgba(0,0,0,0)',
					}}>
					<motion.div style={{ display: 'flex' }} animate={{ opacity: active ? 0 : 1, width: active ? 0 : 18 }} transition={defaultComponentTransition}>
						<BellRing size={18} />
					</motion.div>

					<span>Notify me</span>
				</Button>
			</div>
		</Box>
	);
}
