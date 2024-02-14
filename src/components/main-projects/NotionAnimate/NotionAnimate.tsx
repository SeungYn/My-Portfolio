import { motion, AnimatePresence } from 'framer-motion';

type Props = {
	isOpen: boolean;
	toggleIsOpen: () => void;
	src: string;
};
export default function NotionAnimate({ isOpen, src, toggleIsOpen }: Props) {
	return (
		<AnimatePresence initial={false} mode="wait">
			{isOpen && (
				<motion.div
					className="fixed !left-0 !top-0 z-20 flex h-screen w-screen items-center justify-center"
					style={{ backgroundColor: '#00000000' }}
					initial={{ backgroundColor: '#00000000' }}
					animate={{ backgroundColor: '#1111117b' }}
					exit={{ backgroundColor: '#00000000' }}
					transition={{ duration: 0.3, delay: 0.3, when: 'beforeChildren' }}
					onClick={toggleIsOpen}
				>
					<motion.section
						className="max-w-screen-md:w-[90%]  h-[80%] w-[80%] bg-white max-md:w-[90%]"
						initial={{ translateY: '100%', opacity: 0.5, scale: 0.1 }}
						animate={{ translateY: '0%', opacity: 1, scale: 1 }}
						exit={{ translateY: '100%', opacity: 0.5, scale: 0.1 }}
						transition={{ duration: 0.3 }}
					>
						<iframe src={src} width={'100%'} height={'100%'}></iframe>
					</motion.section>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
