import Link from 'next/link';
import { BlogIcon, GitHubIcon, GitlabIcon } from '../common/icons/react-icons';

const ICONLIST = [
  { link: '/', ICON: <BlogIcon size={30} /> },
  { link: '/', ICON: <GitHubIcon size={30} /> },
  { link: '/', ICON: <GitlabIcon size={30} /> },
];

export default function Introduce() {
  return (
    <section className='h-screen flex flex-col justify-center'>
      <h1 className='text-green pb-8 text-2xl'>안녕하세요. 저는 웹 개발자</h1>
      <h2 className='text-lightest-slate text-6xl font-bold pb-6'>
        유승윤입니다.
      </h2>
      <h2 className='text-6xl font-bold pb-8'>
        저는 끊임없는 도전을 즐기며,
        <br /> 웹 개발의 매력에 빠져 있습니다.
      </h2>
      <p className='max-w-[580px] break-keep text-xl pb-8'>
        현재는 프론트엔드 기술을 중심으로 심층적인 학습을 진행 중이며, 이를
        토대로 사용자에게 먼저 다가갈 수 있는 웹사이트의 프론트엔드 부분을
        담당하고 있습니다. 제 웹 포트폴리오를 방문해 주셔서 진심으로
        감사드립니다.
      </p>

      <ol className='flex gap-4 text-green'>
        {ICONLIST.map((obj, i) => (
          <Link key={i} href={obj.link} target='_blank'>
            <li>{obj.ICON}</li>
          </Link>
        ))}
      </ol>
    </section>
  );
}
