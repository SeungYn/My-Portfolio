'use client';
import { SectionID } from '@/constant/sectionId';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Menu() {
	const navContainerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const onToggle = () => setIsOpen((t) => !t);

	useOnClickOutside(
		navContainerRef,
		useCallback(() => {
			setIsOpen(false);
		}, [])
	);

	/* 사이드바가 오픈일 때 사이드 이펙트 */
	useEffect(() => {
		const mainEl = document.getElementById(SectionID.mainContent)!;
		if (isOpen) {
			document.body.style.overflowY = 'hidden';
			mainEl.style.filter = 'blur(4px)';
		} else {
			document.body.style.overflowY = 'auto';
			mainEl.style.filter = 'none';
		}
	}, [isOpen]);

	/* resize event */
	useEffect(() => {
		const onResize = (e: UIEvent) => {
			if (window.innerWidth > 768) setIsOpen(false);
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<div ref={navContainerRef} className=" z-30 hidden  h-[40px]  max-md:block">
			<div className="relative z-10 inline-block h-[40px] w-[30px]  text-green">
				<button
					onClick={onToggle}
					className="absolute top-1/2 -translate-y-1/2 "
				>
					{isOpen ? (
						<IoMdClose size={40} className="pointer-events-none relative" />
					) : (
						<RxHamburgerMenu
							size={40}
							className="pointer-events-none relative"
						/>
					)}
				</button>
			</div>
			<aside
				className={`${isOpen ? openSideBar : closeSideBar} fixed right-0 top-0 z-0 hidden h-screen w-[min(400px,_75vw)] items-center justify-center bg-light-navy px-10 py-16 shadow-lg shadow-navy-shadow transition-all max-md:flex`}
			>
				<nav>
					<ol className="text-2xl">
						<Link href="/">
							<li className="flex flex-col items-center px-8 py-4">
								<span className="text-green">01.</span>
								<p>About</p>
							</li>
						</Link>
						<Link href="/">
							<li className="flex flex-col items-center px-8 py-4">
								<span className="text-green">02.</span>
								<p>Skills</p>
							</li>
						</Link>
						<Link href="/">
							<li className="flex flex-col items-center px-8 py-4">
								<span className="text-green">03.</span>
								<p>Projects</p>
							</li>
						</Link>
						<Link href="/">
							<li className="flex flex-col items-center px-8 py-4">
								<span className="text-green">04.</span>
								<p>Contact</p>
							</li>
						</Link>
					</ol>
				</nav>
			</aside>
		</div>
	);
}

const openSideBar = 'translate-x-0';
const closeSideBar = 'translate-x-full';
