import { PropsWithChildren } from "react";
import styles from "./SectionContainer.module.css";

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
}: PropsWithChildren<Props>) {
  return (
    <section className={`${className ? className : ""} mb-8 py-24`}>
      <h2 className={`${styles.sectionHeader}`}>
        <span className="text-xl text-green">{count}</span>
        <p className="text-3xl font-semibold">{title}</p>
      </h2>
      {children}
    </section>
  );
}
