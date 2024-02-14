import { Variant, Variants } from 'framer-motion';
/* Fade up */

/* Fade down */

export const FadeDown: Variants = {
	init: {
		opacity: 0.01,
		y: -20,
		transition: {
			duration: 0.3,
		},
	},
	on: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
		},
	},
};

export const FadeUp: Variants = {
	init: {
		opacity: 0.01,
		y: 20,
		transition: {
			duration: 0.3,
		},
	},
	on: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
		},
	},
};
