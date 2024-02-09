'use client';

import SectionContainer from '@/components/common/section/SectionContainer/SectionContainer';
import styles from './Skills.module.css';
import { useState } from 'react';
import SkillContent from '../SkillContent/SkillContent';

export const SkillCategoryList = [
  { index: 0, title: 'Language', class: styles.skillTabActiveter0 },
  { index: 1, title: 'FrontEnd', class: styles.skillTabActiveter1 },
  { index: 2, title: 'BackEnd', class: styles.skillTabActiveter2 },
  { index: 3, title: 'Database', class: styles.skillTabActiveter3 },
  { index: 4, title: 'ETC', class: styles.skillTabActiveter4 },
];

export default function Skills() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  return (
    <SectionContainer
      title='Skills'
      count='02.'
      className='mx-0 md:mx-6 min-h-[500px]'
    >
      <div className='flex flex-col  md:flex-row '>
        <div className={styles.tabList}>
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

        <div className='w-full ml-8 relative mt-6 md:mt-0'>
          <SkillContent categoryIndex={currentTitleIndex} />
        </div>
      </div>
    </SectionContainer>
  );
}
