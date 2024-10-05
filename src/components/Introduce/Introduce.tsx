'use client';

import Link from 'next/link';
import { BlogIcon, GitHubIcon, GitlabIcon } from '../common/icons/react-icons';
import { motion } from 'framer-motion';
import { FadeUp } from '@/constant/framer-motion';
import { Links } from '@/constant/link';
import { useAppSelector } from '@/hooks/useReactRedux';

const ICONLIST = [
	{ link: Links.tstory, ICON: <BlogIcon size={30} /> },
	{ link: Links.github, ICON: <GitHubIcon size={30} /> },
	{ link: Links.gitlab, ICON: <GitlabIcon size={30} /> },
];

export default function Introduce() {
	const isFinishMainLoading = useAppSelector(
		(s) => s.mainLoading.isFinshLoading
	);
	return (
		<motion.section
			className="flex h-screen flex-col justify-center"
			initial="init"
			animate={isFinishMainLoading ? 'on' : 'init'}
			transition={{ staggerChildren: 0.2, delayChildren: 1 }}
		>
			<motion.h1 className="pb-8 text-2xl text-green" variants={FadeUp}>
				안녕하세요. 저는 웹 개발자
			</motion.h1>
			<motion.h2
				className="pb-6 text-6xl font-bold text-lightest-slate"
				variants={FadeUp}
			>
				유승윤입니다.
			</motion.h2>
			<motion.h2 className="pb-8 text-6xl font-bold" variants={FadeUp}>
				저는 끊임없는 도전을 즐기며,
				<br /> 웹 개발의 매력에 빠져 있습니다.
			</motion.h2>
			<motion.p
				className="max-w-[580px] break-keep pb-8 text-xl"
				variants={FadeUp}
			>
				사용자에게 먼저 다가갈 수 있는 웹사이트의 프론트엔드 부분을 담당하고
				있습니다. 제 웹 포트폴리오를 방문해 주셔서 진심으로 감사드립니다.
			</motion.p>

			<motion.ol className="flex gap-4 text-green" variants={FadeUp}>
				{ICONLIST.map((obj, i) => (
					<Link key={i} href={obj.link} target="_blank">
						<li>{obj.ICON}</li>
					</Link>
				))}
			</motion.ol>
		</motion.section>
	);
}
