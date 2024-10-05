'use client';

import { FadeRight } from '@/constant/framer-motion';
import { useAppSelector } from '@/hooks/useReactRedux';
import { motion } from 'framer-motion';

export default function SideEmail() {
	const isFinishMainLoading = useAppSelector(
		(s) => s.mainLoading.isFinshLoading
	);
	return (
		<motion.div
			className="fixed bottom-0 right-[30px] z-20 w-[20px] max-lg:right-[10px] max-md:right-[10px] max-sm:hidden"
			initial="init"
			animate={isFinishMainLoading ? 'on' : 'init'}
			variants={FadeRight}
		>
			<div className="flex flex-col items-center gap-4">
				<a
					href="mailto:kwls0407@gmail.com"
					className="text-base tracking-widest vertical-rl hover:-translate-y-2"
				>
					kwls0407@gmail.com
				</a>
				<div className="h-[120px] w-[1px] bg-light-slate"></div>
			</div>
		</motion.div>
	);
}
