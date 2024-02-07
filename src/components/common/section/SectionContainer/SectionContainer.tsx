import { PropsWithChildren } from 'react';
import styles from './SectionContainer.module.css';

type Props = {
  title: string;
  count: string;
};
export default function SectionContainer({
  children,
  title,
  count,
}: PropsWithChildren<Props>) {
  return (
    <section>
      <h2 className={`${styles.sectionHeader}`}>
        <span className='text-xl text-green'>{count}</span>
        <p className='text-3xl font-semibold'>{title}</p>
      </h2>
      {children}
    </section>
  );
}
