import Introduce from '@/components/Introduce/Introduce';
import Header from '@/components/header/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <div className='max-w-screen-lg mx-auto px-20'>
        <Introduce />
      </div>
    </main>
  );
}
