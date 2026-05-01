'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useReactRedux';
import { mainLoadingActions } from '@/store/slices/loading';
import { useEffect, useRef, useState } from 'react';

const INTRO_TEXT = '"Hello, world!"';
const FRAME_INTERVAL = 1000 / 60;
const INTRO_DURATION = 2000;
const REDUCED_MOTION_DURATION = 1200;
const COLORS = ['#64ffda', '#57cbff', '#f57dff', '#e6f1ff'] as const;

// Canvas에서 매 프레임 이동/렌더링할 기본 입자 정보입니다.
// 위치(x/y), 속도(vx/vy), 투명도(alpha), trail 길이를 조합해 별가루와 꼬리 효과를 만듭니다.
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

// 시작 지점이 원 둘레에 있는 입자입니다.
// 중앙의 링이 터지듯 바깥으로 확산되는 연출에 사용합니다.
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

// CSS 크기와 실제 픽셀 크기를 분리해 DPR이 높은 화면에서도 canvas가 흐려지지 않게 합니다.
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

// 화면 전체에 흩어진 작은 별가루 입자입니다.
// 느리게 사선 이동하며 배경의 우주감을 담당합니다.
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

// 중앙 원 둘레에 입자를 배치한 뒤 바깥 방향 속도를 줍니다.
// 인트로 중반에 링이 폭발하듯 퍼지는 핵심 모션입니다.
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

// 매 프레임 canvas를 덮는 기본 배경입니다.
// 중앙은 살짝 밝고 가장자리는 더 어두운 radial gradient로 깊이감을 만듭니다.
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

// 이미지 없이 큰 타원형 radial gradient를 겹쳐 오로라 느낌을 만듭니다.
// screen 합성 모드를 써서 navy 배경 위에 빛만 얹히도록 처리합니다.
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

// 입자 하나를 trail 선과 점으로 그립니다.
// startAt으로 입자별 등장 타이밍을 늦춰 한 번에 모두 튀어나오지 않게 합니다.
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

// 입자의 위치를 속도만큼 이동시키고 속도를 조금씩 감쇠합니다.
// 빠르게 퍼진 뒤 부드럽게 느려지는 느낌을 만들기 위한 물리 흉내입니다.
const updateParticle = (particle: Particle, deltaRatio: number) => {
	particle.x += particle.vx * deltaRatio;
	particle.y += particle.vy * deltaRatio;
	particle.vx *= Math.pow(particle.decay, deltaRatio);
	particle.vy *= Math.pow(particle.decay, deltaRatio);
};

// 중앙 링의 선형 코어입니다.
// 파티클이 생기기 전후로 시선을 가운데에 잡아주는 역할을 합니다.
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
		// 이 컴포넌트는 클라이언트 전용이라 window/canvas API를 effect 안에서 초기화합니다.
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

		// 모바일에서는 입자 수를 줄여 첫 진입 시 버벅임을 줄입니다.
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

		// 화면 크기가 바뀌면 canvas 픽셀 크기와 입자 배치를 다시 계산합니다.
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

		// Redux 로딩 상태를 종료해서 Header/Introduce의 기존 등장 애니메이션이 시작되게 합니다.
		const finishLoading = () => {
			if (isEnded) {
				return;
			}

			isEnded = true;
			dispatch(mainLoadingActions.onEndLoading());
		};

		// 모든 시각 효과는 elapsed time 기반 progress(0~1)에 맞춰 그립니다.
		// 프레임 드랍이 있어도 전체 재생 시간은 크게 늘어나지 않습니다.
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

			// 문자열을 앞에서부터 잘라 보여주며 타이핑 효과를 만듭니다.
			// index가 바뀔 때만 setState를 호출해 불필요한 React 렌더를 줄입니다.
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

			// 모션 감소 설정 사용자에게는 강한 파티클/오로라 모션을 생략합니다.
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
			// route 전환이나 상태 변경으로 언마운트될 때 RAF와 이벤트를 정리합니다.
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
