'use client';
import { FadeDown } from '@/constant/framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
	const [isHide, setIsHide] = useState(false);

	useEffect(() => {
		let lastScrollY = window.scrollY;
		const onScroll = () => {
			const differenceY = lastScrollY - window.scrollY;

			if (!!differenceY === isHide) return;
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
			className={`bg-['rgba(10, 25, 47, 0.85)'] fixed z-30 w-full backdrop-blur-lg transition-all ${isHide ? '-translate-y-full' : 'translate-y-0'}`}
		>
			<nav className="flex items-center justify-between px-10 py-8">
				<Link href="/">
					<Image
						width={60}
						height={60}
						src={'/assets/main-logo.jpg'}
						alt="로고 이미지"
					/>
				</Link>

				<motion.ol
					className="flex gap-6 text-base [&>a>li>span]:text-green [&>a>li]:flex [&>a>li]:gap-1"
					initial={'init'}
					animate={'on'}
					transition={{ staggerChildren: 0.1 }}
				>
					<Link href="/">
						<motion.li variants={FadeDown}>
							<span>01.</span>
							<p>About</p>
						</motion.li>
					</Link>
					<Link href="/">
						<motion.li variants={FadeDown}>
							<span>02.</span>
							<p>Skills</p>
						</motion.li>
					</Link>
					<Link href="/">
						<motion.li variants={FadeDown}>
							<span>03.</span>
							<p>Projects</p>
						</motion.li>
					</Link>
					<Link href="/">
						<motion.li variants={FadeDown}>
							<span>04.</span>
							<p>Contact</p>
						</motion.li>
					</Link>
					{/* <li>
						<button>Resume</button>
					</li> */}
				</motion.ol>
			</nav>
		</header>
	);
}
