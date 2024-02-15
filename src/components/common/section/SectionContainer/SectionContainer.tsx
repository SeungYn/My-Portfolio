'use client';
import { ComponentProps, PropsWithChildren, PropsWithRef } from 'react';
import styles from './SectionContainer.module.css';
import WithFadeUpTranslate from '@/components/container/WithFadeUpTranslate';

type Props = {
	title: string;
	count: string;
	className?: string;
} & ComponentProps<'section'>;

export default function SectionContainer({
	children,
	title,
	count,
	className,
	...attr
}: PropsWithRef<PropsWithChildren<Props>>) {
	return (
		<section
			className={`${className ? className : ''}  mb-8  py-24 `}
			{...attr}
		>
			<WithFadeUpTranslate>
				<h2 className={`${styles.sectionHeader}  `}>
					<span className="text-xl text-green ">{count}</span>
					<p className="text-3xl font-semibold">{title}</p>
				</h2>
			</WithFadeUpTranslate>
			{children}
		</section>
	);
}
