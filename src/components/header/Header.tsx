'use client';
import { FadeDown } from '@/constant/framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Menu from '../menu/Menu';
import { SectionID } from '@/constant/sectionId';

export default function Header() {
	const [isHide, setIsHide] = useState(false);

	useEffect(() => {
		let lastScrollY = window.scrollY;
		const onScroll = () => {
			const differenceY = lastScrollY - window.scrollY;

			if (differenceY >= 0) setIsHide(false);
			else setIsHide(true);
			lastScrollY = window.scrollY;
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<header
			className={`bg-['rgba(10, 25, 47, 0.85)'] fixed z-30  w-screen backdrop-blur-lg transition-all ${isHide ? '-translate-y-full' : 'translate-y-0'}`}
		>
			<nav className="flex items-center justify-between px-10 py-8 max-md:py-4">
				<Link
					href="/"
					className="relative block h-[60px] w-[60px] max-md:h-[40px] max-md:w-[40px]"
				>
					<Image
						fill
						src={'/assets/main-logo.jpg'}
						alt="로고 이미지"
						sizes="60px, (max-width: 768px) 40px"
					/>
				</Link>

				<motion.ol
					className="flex items-center gap-6 text-base max-md:hidden [&>a>li>span]:text-green [&>a>li]:flex [&>a>li]:gap-1"
					initial={'init'}
					animate={'on'}
					transition={{ staggerChildren: 0.1 }}
				>
					<Link href={`/#${SectionID.aboutMe}`}>
						<motion.li variants={FadeDown}>
							<span>01.</span>
							<p>About</p>
						</motion.li>
					</Link>
					<Link href={`/#${SectionID.skills}`}>
						<motion.li variants={FadeDown}>
							<span>02.</span>
							<p>Skills</p>
						</motion.li>
					</Link>
					<Link href={`/#${SectionID.mainProjects}`}>
						<motion.li variants={FadeDown}>
							<span>03.</span>
							<p>Projects</p>
						</motion.li>
					</Link>
					<Link href={`/#${SectionID.contact}`}>
						<motion.li variants={FadeDown}>
							<span>04.</span>
							<p>Contact</p>
						</motion.li>
					</Link>
					{/* <li>
						<button>Resume</button>
					</li> */}
				</motion.ol>
				{/* side menu */}
				<Menu />
			</nav>
		</header>
	);
}
