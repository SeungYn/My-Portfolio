'use client';
import { GitHubIcon, GitlabIcon } from '@/components/common/icons/react-icons';
import { FadeLeft } from '@/constant/framer-motion';
import { motion } from 'framer-motion';

export default function SideSocial() {
	return (
		<motion.div
			className="fixed bottom-0 left-[30px] z-20 w-[30px] max-lg:left-[10px] max-sm:hidden"
			initial="init"
			animate="on"
			variants={FadeLeft}
		>
			<div className="flex flex-col items-center gap-4 text-3xl [&_a:hover]:-translate-y-2">
				<a href="https://github.com/SeungYn">
					<GitHubIcon />
				</a>
				<a href="https://gitlab.com/commerce9235338/emmerce-web">
					<GitlabIcon />
				</a>
				<div className="h-[120px] w-[1px] bg-light-slate"></div>
			</div>
		</motion.div>
	);
}
