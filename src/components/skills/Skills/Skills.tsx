'use client';

import SectionContainer from '@/components/common/section/SectionContainer/SectionContainer';
import styles from './Skills.module.css';
import { useEffect, useState } from 'react';
import IconBackground from '@/components/common/icons/IconBackground/IconBackground';

//language svg
import CSSIcon from '/public/assets/skills/icons/language/css-3.svg';
import HTMLIcon from '/public/assets/skills/icons/language/html-5.svg';
import JAVAIcon from '/public/assets/skills/icons/language/java.svg';
import JavscriptIcon from '/public/assets/skills/icons/language/javascript.svg';
import TypescriptIcon from '/public/assets/skills/icons/language/typescript-icon.svg';

//front svg
import AxiosIcon from '/public/assets/skills/icons/front/axios.svg';
import ReactIcon from '/public/assets/skills/icons/front/react.svg';
import NextJSIcon from '/public/assets/skills/icons/front/nextjs-icon.svg';
import PlaywrightIcon from '/public/assets/skills/icons/front/playwright.svg';
import PostCSSIcon from '/public/assets/skills/icons/front/postcss.svg';
import ReactQueryIcon from '/public/assets/skills/icons/front/react-query-icon.svg';
import ReactRouterIcon from '/public/assets/skills/icons/front/react-router.svg';
import RecoilIcon from '/public/assets/skills/icons/front/recoil-icon.svg';
import ReduxIcon from '/public/assets/skills/icons/front/redux.svg';
import JestAxiosIcon from '/public/assets/skills/icons/front/jest.svg';
import TestingLibraryIcon from '/public/assets/skills/icons/front/testing-library.svg';
import SkillContent from '../SkillContent/SkillContent';

export const SkillCategoryList = [
  { index: 0, title: 'Language', class: styles.skillTabActiveter0 },
  { index: 1, title: 'FrontEnd', class: styles.skillTabActiveter1 },
  { index: 2, title: 'BackEnd', class: styles.skillTabActiveter2 },
  { index: 3, title: 'Database', class: styles.skillTabActiveter3 },
  { index: 4, title: 'ETC', class: styles.skillTabActiveter4 },
];

const SkillList = [
  [
    {
      SkillIcon: (
        <IconBackground>
          <HTMLIcon width={60} height={60} />
        </IconBackground>
      ),
    },
    {
      SkillIcon: (
        <IconBackground>
          <CSSIcon width={60} height={60} />
        </IconBackground>
      ),
    },
    {
      SkillIcon: (
        <IconBackground>
          <JavscriptIcon width={60} height={60} />
        </IconBackground>
      ),
    },
    {
      SkillIcon: (
        <IconBackground>
          <TypescriptIcon width={60} height={60} />
        </IconBackground>
      ),
    },
    {
      SkillIcon: (
        <IconBackground>
          <JAVAIcon width={60} height={60} />
        </IconBackground>
      ),
    },
  ],
];

export default function Skills() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isMount, setIsMount] = useState(false);
  console.log();
  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <SectionContainer title='Skills' count='02.' className='mx-6 min-h-[500px]'>
      <div className='flex'>
        <div className='relative w-max'>
          {SkillCategoryList.map((obj) => (
            <button
              key={obj.title}
              className={`${styles.tabBtn} ${
                obj.index === currentTitleIndex ? 'text-green' : ''
              }`}
              onClick={() => setCurrentTitleIndex(obj.index)}
            >
              {obj.title}
            </button>
          ))}

          <div
            className={`${styles.skillTabActiveter} ${SkillCategoryList[currentTitleIndex].class}`}
          ></div>
        </div>
        <div className='w-full ml-8 relative'>
          <SkillContent categoryIndex={currentTitleIndex} />
        </div>
      </div>

      <div
        className={`${styles.test} ${
          isMount ? styles.testActive : styles.testActive
        }`}
      ></div>
    </SectionContainer>
  );
}
