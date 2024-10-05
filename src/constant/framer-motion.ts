import { Variant, Variants } from 'framer-motion';

export const MainDelay = 0.5;

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

/* Fade up */

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

/* Fade right */

export const FadeRight: Variants = {
	init: {
		opacity: 0.01,
		x: 20,
		transition: {
			duration: 0.3,
		},
	},
	on: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			delay: 2.5,
		},
	},
};

/* Fade left */

export const FadeLeft: Variants = {
	init: {
		opacity: 0.01,
		x: -20,
		transition: {
			duration: 0.3,
		},
	},
	on: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			delay: 2.5,
		},
	},
};
