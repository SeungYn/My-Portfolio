'use client';
import { PropsWithChildren, PropsWithRef } from 'react';
import styles from './SectionContainer.module.css';
import WithFadeUpTranslate from '@/components/container/WithFadeUpTranslate';

type Props = {
	title: string;
	count: string;
	className?: string;
};
export default function SectionContainer({
	children,
	title,
	count,
	className,
}: PropsWithRef<PropsWithChildren<Props>>) {
	return (
		<section className={`${className ? className : ''} }  mb-8  py-24 `}>
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
