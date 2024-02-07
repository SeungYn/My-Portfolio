import Introduce from '@/components/Introduce/Introduce';
import AboutMe from '@/components/aboutme/AboutMe/AboutMe';
import Header from '@/components/header/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <div className='max-w-screen-lg mx-auto px-20'>
        <Introduce />
        <AboutMe />
      </div>
    </main>
  );
}
