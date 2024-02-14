'use client';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

type Props = {
	delay?: number;
};

export default function WithFadeUpTranslate({
	children,
	delay = 0,
}: PropsWithChildren<Props>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isIntersection, setIsInterscrion] = useState(false);

	useEffect(() => {
		if (!containerRef.current) return;
		const observe = new IntersectionObserver(
			(e) => {
				e.forEach((entity) => {
					if (entity.isIntersecting) {
						setIsInterscrion(true);
					}
				});
			},
			{ threshold: 0.3 }
		);
		observe.observe(containerRef.current);

		return () => {
			observe.disconnect();
		};
	}, [containerRef]);

	return (
		<div
			ref={containerRef}
			className={`relative transition-all duration-700 ${!isIntersection ? 'translate-y-20 opacity-0' : '-translate-y-0 opacity-100'}`}
			style={{
				transitionDelay: `0.${delay}s`,
			}}
		>
			{children}
		</div>
	);
}
