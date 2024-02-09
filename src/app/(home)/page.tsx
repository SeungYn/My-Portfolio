import Introduce from '@/components/Introduce/Introduce';
import AboutMe from '@/components/aboutme/AboutMe/AboutMe';
import Header from '@/components/header/Header';
import Skills from '@/components/skills/Skills/Skills';

export default function Home() {
  return (
    <main>
      <Header />
      <div className='max-w-screen-xl mx-auto px-20'>
        <div className=' mx-auto max-w-[1000px]'>
          <Introduce />
          <AboutMe />
          <Skills />
        </div>
      </div>
    </main>
  );
}
