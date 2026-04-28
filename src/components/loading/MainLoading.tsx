'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useReactRedux';
import { mainLoadingActions } from '@/store/slices/loading';
import { useEffect, useRef, useState } from 'react';

const INTRO_TEXT = '"Hello, world!"';
const FRAME_INTERVAL = 1000 / 60;
const INTRO_DURATION = 2000;
const REDUCED_MOTION_DURATION = 1200;
const COLORS = ['#64ffda', '#57cbff', '#f57dff', '#e6f1ff'] as const;

type Particle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	color: (typeof COLORS)[number];
	alpha: number;
	decay: number;
	trail: number;
	startAt: number;
};

type RingParticle = Particle & {
	angle: number;
	baseRadius: number;
};

export const randomNumBetween = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const clamp = (value: number, min: number, max: number) => {
	return Math.min(Math.max(value, min), max);
};

const easeOutCubic = (value: number) => {
	return 1 - Math.pow(1 - value, 3);
};

const easeInOutSine = (value: number) => {
	return -(Math.cos(Math.PI * value) - 1) / 2;
};

const initCanvas = (canvas: HTMLCanvasElement) => {
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		return null;
	}

	const width = window.innerWidth;
	const height = window.innerHeight;
	const dpr = window.devicePixelRatio || 1;

	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;
	canvas.width = width * dpr;
	canvas.height = height * dpr;

	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

	return { ctx, width, height };
};

const createDustParticles = (width: number, height: number, count: number) => {
	return Array.from({ length: count }, (_, index): Particle => {
		const drift = randomNumBetween(0.08, 0.55);
		const angle = randomNumBetween(-Math.PI * 0.9, -Math.PI * 0.1);

		return {
			x: randomNumBetween(0, width),
			y: randomNumBetween(0, height),
			vx: Math.cos(angle) * drift,
			vy: Math.sin(angle) * drift,
			radius: randomNumBetween(0.6, 2.2),
			color: COLORS[index % COLORS.length],
			alpha: randomNumBetween(0.35, 0.85),
			decay: randomNumBetween(0.985, 0.996),
			trail: randomNumBetween(4, 14),
			startAt: randomNumBetween(0, 0.45),
		};
	});
};

const createRingParticles = (width: number, height: number, count: number) => {
	const centerX = width / 2;
	const centerY = height / 2;
	const baseRadius = Math.min(width, height) * 0.26;

	return Array.from({ length: count }, (_, index): RingParticle => {
		const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
		const burst = randomNumBetween(1.4, 4.2);
		const tangent = angle + Math.PI / 2;
		const x = centerX + Math.cos(angle) * baseRadius;
		const y = centerY + Math.sin(angle) * baseRadius;

		return {
			x,
			y,
			vx:
				Math.cos(angle) * burst +
				Math.cos(tangent) * randomNumBetween(-0.8, 0.8),
			vy:
				Math.sin(angle) * burst +
				Math.sin(tangent) * randomNumBetween(-0.8, 0.8),
			radius: randomNumBetween(0.9, 2.4),
			color: COLORS[index % COLORS.length],
			alpha: randomNumBetween(0.55, 1),
			decay: randomNumBetween(0.975, 0.99),
			trail: randomNumBetween(8, 24),
			startAt: index / count / 2.6,
			angle,
			baseRadius,
		};
	});
};

const drawBackground = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	progress: number
) => {
	const gradient = ctx.createRadialGradient(
		width / 2,
		height / 2,
		0,
		width / 2,
		height / 2,
		Math.max(width, height) * 0.75
	);

	gradient.addColorStop(0, `rgba(35, 53, 84, ${0.58 - progress * 0.25})`);
	gradient.addColorStop(0.45, 'rgba(10, 25, 47, 0.96)');
	gradient.addColorStop(1, 'rgba(2, 12, 27, 1)');

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, width, height);
};

const drawAurora = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	progress: number
) => {
	const glow = easeInOutSine(clamp(progress * 1.2, 0, 1));
	const ribbons = [
		{ rgb: '100, 255, 218', alpha: 0.22, y: height * 0.38, rotate: -0.16 },
		{ rgb: '87, 203, 255', alpha: 0.18, y: height * 0.5, rotate: 0.12 },
		{ rgb: '245, 125, 255', alpha: 0.14, y: height * 0.58, rotate: -0.04 },
	];

	ctx.save();
	ctx.globalCompositeOperation = 'screen';

	ribbons.forEach((ribbon, index) => {
		const alpha = (1 - progress * 0.25) * glow;
		const x = width * (0.5 + Math.sin(progress * Math.PI + index) * 0.08);

		ctx.save();
		ctx.translate(x, ribbon.y);
		ctx.rotate(ribbon.rotate);
		ctx.scale(1, 0.24);

		const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.58);
		gradient.addColorStop(
			0,
			`rgba(${ribbon.rgb}, ${ribbon.alpha * alpha * 2})`
		);
		gradient.addColorStop(0.52, `rgba(${ribbon.rgb}, ${ribbon.alpha * alpha})`);
		gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.ellipse(0, 0, width * 0.62, height * 0.52, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});

	ctx.restore();
};

const drawParticle = (
	ctx: CanvasRenderingContext2D,
	particle: Particle,
	progress: number
) => {
	const localProgress = clamp(
		(progress - particle.startAt) / (1 - particle.startAt),
		0,
		1
	);

	if (localProgress <= 0) {
		return;
	}

	const reveal = easeOutCubic(clamp(localProgress * 2.5, 0, 1));
	const alpha = particle.alpha * reveal * Math.pow(1 - localProgress, 0.55);

	if (alpha <= 0.01) {
		return;
	}

	ctx.save();
	ctx.globalCompositeOperation = 'screen';
	ctx.strokeStyle = particle.color;
	ctx.fillStyle = particle.color;
	ctx.globalAlpha = alpha * 0.55;
	ctx.lineWidth = particle.radius;
	ctx.beginPath();
	ctx.moveTo(particle.x, particle.y);
	ctx.lineTo(
		particle.x - particle.vx * particle.trail,
		particle.y - particle.vy * particle.trail
	);
	ctx.stroke();

	ctx.globalAlpha = alpha;
	ctx.beginPath();
	ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
};

const updateParticle = (particle: Particle, deltaRatio: number) => {
	particle.x += particle.vx * deltaRatio;
	particle.y += particle.vy * deltaRatio;
	particle.vx *= Math.pow(particle.decay, deltaRatio);
	particle.vy *= Math.pow(particle.decay, deltaRatio);
};

const drawRingCore = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	progress: number
) => {
	const radius = Math.min(width, height) * (0.2 + easeOutCubic(progress) * 0.1);
	const alpha = clamp(1 - progress * 1.25, 0, 1);

	ctx.save();
	ctx.globalCompositeOperation = 'screen';
	ctx.strokeStyle = `rgba(100, 255, 218, ${alpha * 0.5})`;
	ctx.lineWidth = 1.2;
	ctx.beginPath();
	ctx.arc(
		width / 2,
		height / 2,
		radius,
		-Math.PI / 2,
		Math.PI * 2 * easeOutCubic(progress) - Math.PI / 2
	);
	ctx.stroke();

	ctx.strokeStyle = `rgba(87, 203, 255, ${alpha * 0.32})`;
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.arc(width / 2, height / 2, radius * 0.92, 0, Math.PI * 2);
	ctx.stroke();
	ctx.restore();
};

const MainLoading = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const frameRef = useRef<number | null>(null);
	const lastTextIndexRef = useRef(-1);
	const [typedText, setTypedText] = useState('');
	const [isPlacedParticle, setIsPlacedParticle] = useState(false);
	const isFinishMainLoading = useAppSelector(
		(s) => s.mainLoading.isFinshLoading
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		const duration = prefersReducedMotion
			? REDUCED_MOTION_DURATION
			: INTRO_DURATION;
		let canvasState = initCanvas(canvas);

		if (!canvasState) {
			dispatch(mainLoadingActions.onEndLoading());
			return;
		}

		let dustParticles = createDustParticles(
			canvasState.width,
			canvasState.height,
			window.innerWidth < 768 ? 70 : 130
		);
		let ringParticles = createRingParticles(
			canvasState.width,
			canvasState.height,
			window.innerWidth < 768 ? 140 : 240
		);
		let then = performance.now();
		const startedAt = then;
		let isEnded = false;

		const handleResize = () => {
			canvasState = initCanvas(canvas);

			if (!canvasState) {
				return;
			}

			dustParticles = createDustParticles(
				canvasState.width,
				canvasState.height,
				window.innerWidth < 768 ? 70 : 130
			);
			ringParticles = createRingParticles(
				canvasState.width,
				canvasState.height,
				window.innerWidth < 768 ? 140 : 240
			);
		};

		const finishLoading = () => {
			if (isEnded) {
				return;
			}

			isEnded = true;
			dispatch(mainLoadingActions.onEndLoading());
		};

		const renderFrame = (now: number) => {
			if (!canvasState || isEnded) {
				return;
			}

			const delta = now - then;

			if (delta < FRAME_INTERVAL) {
				frameRef.current = requestAnimationFrame(renderFrame);
				return;
			}

			then = now - (delta % FRAME_INTERVAL);

			const progress = clamp((now - startedAt) / duration, 0, 1);
			const typingProgress = clamp((now - startedAt) / (duration * 0.58), 0, 1);
			const textIndex = Math.floor(
				easeOutCubic(typingProgress) * INTRO_TEXT.length
			);

			if (lastTextIndexRef.current !== textIndex) {
				lastTextIndexRef.current = textIndex;
				setTypedText(INTRO_TEXT.slice(0, textIndex));
			}

			if (progress > 0.48) {
				setIsPlacedParticle(true);
			}

			const { ctx, width, height } = canvasState;
			const deltaRatio = delta / FRAME_INTERVAL;

			ctx.clearRect(0, 0, width, height);
			drawBackground(ctx, width, height, progress);

			if (!prefersReducedMotion) {
				drawAurora(ctx, width, height, progress);
				drawRingCore(ctx, width, height, progress);

				dustParticles.forEach((particle) => {
					updateParticle(particle, deltaRatio);
					drawParticle(ctx, particle, progress);
				});

				ringParticles.forEach((particle) => {
					updateParticle(particle, deltaRatio);
					drawParticle(ctx, particle, progress);
				});
			}

			if (progress >= 1) {
				finishLoading();
				return;
			}

			frameRef.current = requestAnimationFrame(renderFrame);
		};

		window.addEventListener('resize', handleResize);
		frameRef.current = requestAnimationFrame(renderFrame);

		return () => {
			isEnded = true;
			window.removeEventListener('resize', handleResize);

			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
			}
		};
	}, [dispatch]);

	if (isFinishMainLoading) return null;

	return (
		<section className="fixed inset-0 z-[10000] h-screen w-screen overflow-hidden bg-navy">
			<canvas ref={canvasRef} className="h-full w-full" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,255,218,0.08),transparent_34%),radial-gradient(circle_at_30%_20%,rgba(87,203,255,0.08),transparent_28%),radial-gradient(circle_at_70%_76%,rgba(245,125,255,0.07),transparent_26%)]" />
			<h1
				className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-normal text-lightest-slate transition-all duration-500 ease-out ${
					isPlacedParticle ? 'scale-110 opacity-95' : 'scale-100 opacity-85'
				}`}
				style={{
					textShadow: isPlacedParticle
						? '0 0 18px rgba(100,255,218,0.78), 0 0 48px rgba(87,203,255,0.34)'
						: '0 0 10px rgba(100,255,218,0.32)',
				}}
			>
				{typedText}
				<span className="ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.12em] animate-pulse bg-green" />
			</h1>
		</section>
	);
};

export default MainLoading;
