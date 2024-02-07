import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav className='flex justify-between items-center px-10 py-8'>
        <Link href='/'>
          <Image
            width={60}
            height={60}
            src={'/assets/main-logo.jpg'}
            alt='로고 이미지'
          />
        </Link>

        <ol className='flex gap-6 [&>a>li]:flex [&>a>li]:gap-1 [&>a>li>span]:text-green text-sm'>
          <Link href='/'>
            <li>
              <span>01.</span>
              <p>About</p>
            </li>
          </Link>
          <Link href='/'>
            <li>
              <span>02.</span>
              <p>Skills</p>
            </li>
          </Link>
          <Link href='/'>
            <li>
              <span>03.</span>
              <p>Projects</p>
            </li>
          </Link>
          <Link href='/'>
            <li>
              <span>04.</span>
              <p>Contact</p>
            </li>
          </Link>
          <li>
            <button>Resume</button>
          </li>
        </ol>
      </nav>
    </header>
  );
}
