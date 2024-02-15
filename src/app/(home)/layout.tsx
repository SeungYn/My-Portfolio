import type { Metadata, Viewport } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import Header from '@/components/header/Header';

const nanum = Nanum_Gothic({
	subsets: ['latin'],
	weight: ['400', '700', '800'],
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// Also supported by less commonly used
	// interactiveWidget: 'resizes-visual',
};

/* meta data */
export const metadata: Metadata = {
	metadataBase: new URL('https://seungyn.com'),
	title: '프론트엔드 유승윤 | 포트폴리오',
	description:
		'프론트엔드 개발자 유승윤 포트폴리오, seungyn frontend portfolio',
	keywords:
		'프론트엔드,리액트, 자바스크립트,타입스크립트, 리액트쿼리, 주스탄드,스프링,포트폴리오,넥스트,frontend, React,nextjs, typescript, javascript, typescript, zustant, react-query',
	openGraph: {
		title: '프론트엔드 유승윤 | 포트폴리오',
		type: 'website',
		siteName: 'seungyn',
		images: '/assets/og/ogImage.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="kr">
			<body
				className={`${nanum.className} w-screen overflow-x-hidden bg-navy text-slate `}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
