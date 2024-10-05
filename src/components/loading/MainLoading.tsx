'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/useReactRedux';
import { mainLoadingActions } from '@/store/slices/loading';
import { useEffect, useRef, useState } from 'react';

const interval = 1000 / 60;

export default function MainLoading() {
	//const [particles, setParticles] = useState<Particle[]>([]);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isPlacedParticle, setIsPlacedParticle] = useState(false);
	const isFinishMainLoading = useAppSelector(
		(s) => s.mainLoading.isFinshLoading
	);
	const dispatch = useAppDispatch();
	//console.log(isFinishMainLoading);
	const initCanvas = (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext('2d')!;
		const canvasWidth = innerWidth;
		const canvasHeight = innerHeight;
		const dpr = window.devicePixelRatio;
		canvas.style.width = canvasWidth + 'px';
		canvas.style.height = canvasHeight + 'px';
		canvas.width = canvasWidth * dpr;
		canvas.height = canvasHeight * dpr;

		ctx.scale(dpr, dpr);
	};

	const canvasRender = (ctx: CanvasRenderingContext2D) => {
		const particles: Particle[] = [];
		let isDrawParticle = false;
		let now, delta;
		let then = Date.now();

		function createRing() {
			const PARTICLE_NUM = 360;
			const perCount = 4;

			function drawNextParticle(count: number) {
				if (count > PARTICLE_NUM - perCount) {
					isDrawParticle = true;
					setIsPlacedParticle(true);
					return;
				}

				for (let i = count; i <= count + perCount; i += 0.5) {
					const particle = new Particle(i);
					particles.push(particle);
					particle.draw(ctx);
				}

				requestAnimationFrame(() => drawNextParticle(count + perCount));
			}

			requestAnimationFrame(() => drawNextParticle(0));
		}

		createRing();

		const frame = () => {
			requestAnimationFrame(frame);
			if (isDrawParticle === false) return;

			now = Date.now();
			delta = now - then;

			if (delta < interval) {
				//console.log('조건미달');
				return;
			}

			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			for (let i = particles.length - 1; i >= 0; i--) {
				particles[i].update();
				particles[i].draw(ctx);

				if (particles[i].opacity < 0) particles.splice(i, 1);
			}

			then = now - (delta % interval);

			if (particles.length === 0) {
				// 파티클이 다 지워지면 로딩이 끝난 것
				//console.log('끝');
				dispatch(mainLoadingActions.onEndLoading());
				return;
			}
		};

		requestAnimationFrame(frame);
	};

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');

		if (!canvasRef.current) return;
		if (!ctx) return;

		initCanvas(canvasRef.current);
		canvasRender(ctx);

		return () => {
			console.log('unmount');
		};

		//eslint-disable-next-line
	}, []);

	if (isFinishMainLoading) return null;

	return (
		<section
			className={`fixed z-[10000] h-screen w-screen bg-navy ${isFinishMainLoading ? 'hidden' : 'block'} `}
		>
			<canvas ref={canvasRef} className="h-full w-full"></canvas>
			<h1
				className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-6xl font-bold ${isPlacedParticle ? 'scale-150' : ''} transition-all duration-200 ease-linear`}
			>
				{'"Hello, world!"'}
			</h1>
		</section>
	);
}

export const randomNumBetween = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

class Particle {
	rFriction: number;
	rAlpha: number;
	r: number;
	angleFriction: number;
	angleAlpha: number;
	angle: number;
	opacity: number;
	x: number;
	y: number;

	constructor(angle: number) {
		this.rFriction = randomNumBetween(0.95, 1.01);
		this.rAlpha = randomNumBetween(0, 5);
		this.r = Math.min(innerHeight, innerWidth) / 2.5;

		this.angleFriction = randomNumBetween(0.97, 0.99);
		this.angleAlpha = randomNumBetween(1, 2);
		this.angle = angle - 90; // 12 시 방향부터 시작하도록
		this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
		this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
		// this.opacity = randomNumBetween(0.2, 1);
		this.opacity = 1;
	}

	update() {
		this.rAlpha *= this.rFriction;
		this.r += this.rAlpha;

		this.angleAlpha *= this.angleFriction;
		this.angle += this.angleAlpha;
		this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
		this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

		this.opacity -= 0.009;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255,255,255,${this.opacity}) `;
		ctx.fill();
		ctx.closePath();
	}
}
