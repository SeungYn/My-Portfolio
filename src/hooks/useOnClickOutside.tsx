import { RefObject, useEffect } from 'react';

export default function useOnClickOutside(
	ref: RefObject<HTMLElement>,
	callback: () => void
) {
	useEffect(() => {
		const cb = (e: MouseEvent) => {
			if (!ref?.current || ref.current.contains(e.target as Node)) return;

			callback();
		};

		document.addEventListener('click', cb);

		return () => {
			document.removeEventListener('click', cb);
		};
	}, [ref, callback]);
}
