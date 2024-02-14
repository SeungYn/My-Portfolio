import { useEffect, useRef } from 'react';

export default function useInterSectionCoord<T extends HTMLElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!ref.current) return;

		ref.current!.style.top = '50px';
		ref.current!.style.opacity = '0';

		const observe = new IntersectionObserver(
			(e) => {
				e.forEach((entity) => {
					if (entity.isIntersecting) {
						ref.current!.style.top = '0px';
						ref.current!.style.opacity = '1';
					}
				});
			},
			{ threshold: 0.4 }
		);
		observe.observe(ref.current);

		return () => {
			observe.disconnect();
		};
	}, [ref]);
	return ref;
}
