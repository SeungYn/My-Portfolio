import SectionContainer from "@/components/common/section/SectionContainer/SectionContainer";
import styles from "./MainProjects.module.css";
import Link from "next/link";
import { GitHubIcon, ShareIcon } from "@/components/common/icons/react-icons";

export default function MainProjects() {
  return (
    <SectionContainer title="Main Projects" count="03.">
      <div className={styles.project}>
        <div className={styles.projectCountent}>
          <h3 className={styles.projectOverline}>Main Project</h3>
          <h2 className={styles.projectTitle}>
            <Link href={"/"} target="_blank">
              Emmerce Mall
            </Link>
          </h2>
          <div className={`${styles.projectDescription} `}>
            <p className="whitespace-pre-line">
              아무테스트 작성중 가, 나, 다, 라, 마, <br />
              fwefew 안러다 ㅈㅁ ㅁㅈ다ㅗ며 ㅗㅑㄷ갸 ㅗㅑ <br />
              fewta awrkjwehar ewakjr hewkj
            </p>
          </div>
          <ul className={styles.projectTechList}>
            <li>React</li>
            <li>NextJS v14</li>
            <li>TailwindCSS</li>
          </ul>
          <div className={styles.projectLinks}>
            <Link href={"/"}>
              <GitHubIcon size={20} />
            </Link>
            <Link href={"/"}>
              <ShareIcon size={20} />
            </Link>
          </div>
        </div>
        <div className={styles.projectImage}>
          <a href={"/"}>
            <img src="/assets/sun.jpeg" />
          </a>
        </div>
      </div>
      <div className={styles.project}>
        <div className={styles.projectCountent}>
          <h3 className={styles.projectOverline}>Main Project</h3>
          <h2 className={styles.projectTitle}>
            <Link href={"/"} target="_blank">
              Emmerce Mall
            </Link>
          </h2>
          <div className={styles.projectDescription}>
            <p className="whitespace-pre-line">
              아무테스트 작성중 가, 나, 다, 라, 마, <br />
              fwefew 안러다 ㅈㅁ ㅁㅈ다ㅗ며 ㅗㅑㄷ갸 ㅗㅑ <br />
              fewta awrkjwehar ewakjr hewkj
            </p>
          </div>
          <ul className={styles.projectTechList}>
            <li>React</li>
            <li>NextJS v14</li>
            <li>TailwindCSS</li>
          </ul>
          <div className={styles.projectLinks}>
            <Link href={"/"}>
              <GitHubIcon size={20} />
            </Link>
            <Link href={"/"}>
              <ShareIcon size={20} />
            </Link>
          </div>
        </div>
        <div className={styles.projectImage}>
          <img src="/assets/sun.jpeg" />
        </div>
      </div>
    </SectionContainer>
  );
}
