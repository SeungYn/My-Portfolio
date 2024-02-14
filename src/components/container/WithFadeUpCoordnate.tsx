'use client';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

export default function WithFadeUpCoordnate({ children }: PropsWithChildren) {
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
			className={`relative transition-all duration-700 ${!isIntersection ? 'top-4 opacity-0' : 'top-0 opacity-100'}`}
		>
			{children}
		</div>
	);
}
