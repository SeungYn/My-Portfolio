import { RefObject, useEffect } from 'react';

export default function useOnClickOutside(
	ref: RefObject<HTMLElement>,
	callback: () => void
) {
	useEffect(() => {
		const cb = (e: MouseEvent) => {
			console.log(
				(e.target as HTMLElement).parentNode,
				(e.target as HTMLElement).parentNode?.parentNode
			);
			console.log(e.target);
			console.log(ref, ref!.current!.contains(e.target as Node));
			if (!ref?.current || ref.current.contains(e.target as Node)) return;

			callback();
		};

		document.addEventListener('click', cb);

		return () => {
			document.removeEventListener('click', cb);
		};
	}, [ref, callback]);
}
