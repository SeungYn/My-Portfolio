"use client";

import styles from "./MainProject.module.css";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/types";
import NotionAnimate from "../NotionAnimate/NotionAnimate";
import SpecialBtn from "@/components/common/button/SpecialBtn";

type Props = Project;
export default function MainProject({
  title,
  date,
  serviceMaintain,
  description,
  skillList,
  linkList,
  ImgComponent,
  detailSrc,
}: Props) {
  const [isOpenDetail, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((t) => !t);

  return (
    <div className={styles.project}>
      <div className={styles.projectCountent}>
        <h3 className={styles.projectOverline}>Main Project</h3>
        <h2 className={styles.projectTitle}>
          <Link href={"/"} target="_blank">
            {title}
          </Link>
        </h2>
        {serviceMaintain !== "" && (
          <span className="text-xs text-red-500">{serviceMaintain}</span>
        )}
        <p className="m-0 block md:mb-4 ">{date}</p>

        <div className={`${styles.projectDescription} `}>
          <p
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        <ul className={styles.projectTechList}>
          {skillList.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        <div className={styles.projectLinks}>{linkList}</div>
        <SpecialBtn className="mt-2" onClick={toggleIsOpen}>
          상세내용
        </SpecialBtn>
      </div>
      <div className={styles.projectImage}>{ImgComponent}</div>

      <NotionAnimate
        isOpen={isOpenDetail}
        src={detailSrc}
        toggleIsOpen={toggleIsOpen}
      />
    </div>
  );
}
