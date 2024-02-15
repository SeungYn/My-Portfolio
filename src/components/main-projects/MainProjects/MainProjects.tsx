import SectionContainer from '@/components/common/section/SectionContainer/SectionContainer';
import Link from 'next/link';
import { GitHubIcon, ShareIcon } from '@/components/common/icons/react-icons';
import Image from 'next/image';
import MainProject from '../MainProject/MainProject';
import { Project } from '@/types';
import { SectionID } from '@/constant/sectionId';

const PROJECT_DATA: Project[] = [
	{
		title: 'Emmerce',
		date: '2023.10.16 ~ 2024.01.05',
		serviceMaintain: '',
		description: `Next.js를 이용한 쇼핑몰 프로젝트입니다. 
    SSR, CSR, SSG를 조합하여 이머스를 구축하였으며,
    Next.js(13~14) 숙련도 향상과 함께 GitLab-Issue 기록,
    AWS, Docker, GitLab-Runner를 활용한
    인프라 구성을 목표로 했습니다.
    `,
		skillList: [
			'React',
			'NextJS v14',
			'TailwindCSS',
			'React-Query v5',
			'Zustand',
			'Nginx',
			'Docker',
			'GItlab',
			'KakaoAPI',
			'Typescript',
		],
		linkList: (
			<>
				<Link
					href={'https://gitlab.com/commerce9235338/emmerce-web'}
					target="_blank"
				>
					<GitHubIcon size={20} />
				</Link>
				<Link href={'https://emmerce1.duckdns.org/'} target="_blank">
					<ShareIcon size={20} />
				</Link>
			</>
		),

		ImgComponent: (
			<Link href={'https://emmerce1.duckdns.org/'} target="_blank">
				<Image
					src="/assets/project-images/emmerce-main.png"
					fill
					alt="이미지"
				/>
			</Link>
		),
		detailSrc: '/notion/c82099c04f4540f0817285a224841055',
	},
	{
		title: 'Poje',
		date: '2023.01.15 ~ 2023.03.25',
		serviceMaintain: '* AWS 기간이 만료되어 운영중이지 않습니다.',
		description: `포트폴리오를 제작 및 공유하는 프로젝트입니다.
    로직분리를 위한 Hooks 패턴과 React-Query를 활용한
    데이터 캐싱을 목표로 했으며, React-Testing-Library를
    적용하여 테스트코드를 작성했습니다.
    `,
		skillList: [
			'React',
			'React-Query v4',
			'Recoil',
			'AWS S3',
			'React-Testing-Library',
			'React-Router-Dom v6',
			'GitHub Actions',
			'Typescript',
		],
		linkList: (
			<>
				<Link href={'https://github.com/SeungYn/poje-frontend'} target="_blank">
					<GitHubIcon size={20} />
				</Link>
				<Link href={'https://poje-frontend.vercel.app/'} target="_blank">
					<ShareIcon size={20} />
				</Link>
			</>
		),

		ImgComponent: (
			<Link href={'https://poje-frontend.vercel.app/'} target="_blank">
				<Image src="/assets/project-images/poje-main.png" fill alt="이미지" />
			</Link>
		),
		detailSrc: '/notion/POJE-3928923bdf4d4037b6bc585da568208a',
	},
	{
		title: '혼밥메이트',
		serviceMaintain: '* AWS 기간이 만료되어 운영중이지 않습니다.',
		date: '2022.03 ~ 2022.11',
		description: `대학교에서 밥을 같이 먹을 사람을 구하는 프로젝트입니다.
    Soket.io, Stompjs를 활용해서 실시간 위치공유,
    채팅 기능을 구현했으며, 프로토타입을 위해
    Express를 활용한 테스트 서버 및 
    <a href="https://seungyn.github.io/capstonIntroPage/" style="color:#64ffda;" target="_blank">소개 페이지</a>를 제작했습니다.
    `,
		skillList: [
			'React',
			'React-router-dom',
			'ContextAPI',
			'StompJS',
			'Socket.io',
			'Express',
			'Mysql',
			'KakaoMapAPI',
			'Javascript',
		],
		linkList: (
			<>
				<Link
					href={'https://github.com/SeungYn/capstonClientBySpring'}
					target="_blank"
				>
					<GitHubIcon size={20} />
				</Link>
				<Link
					href={'https://seungyn.github.io/capstonClientBySpring/'}
					target="_blank"
				>
					<ShareIcon size={20} />
				</Link>
			</>
		),

		ImgComponent: (
			<Link
				href={'https://seungyn.github.io/capstonClientBySpring/'}
				target="_blank"
			>
				<Image
					src="/assets/project-images/babmate-main.png"
					fill
					alt="이미지"
				/>
			</Link>
		),
		detailSrc: '/notion/f29afe7d87d44564a7a8f31043b34050',
	},
	{
		title: 'Package',
		serviceMaintain: '* heroku 기간이 만료되어 운영중이지 않습니다.',
		date: '2022.02 ~ 2022.3',
		description: `React와 Express를 학습 후 처음으로 제작한
    택배 및 등기 관리 프로젝트입니다.
    `,
		skillList: ['React', 'Express', 'React-Router-Dom', 'Javascript'],
		linkList: (
			<>
				<Link
					href={'https://github.com/SeungYn/capstonClientBySpring'}
					target="_blank"
				>
					<GitHubIcon size={20} />
				</Link>
				<Link href={'https://hspackges.netlify.app/'} target="_blank">
					<ShareIcon size={20} />
				</Link>
			</>
		),

		ImgComponent: (
			<Link href={'https://hspackges.netlify.app/'} target="_blank">
				<Image
					src="/assets/project-images/hanshin-main.png"
					fill
					alt="이미지"
				/>
			</Link>
		),
		detailSrc: '/notion/a4927aec9b72434db112ec0ade9c2327',
	},
];

export default function MainProjects() {
	return (
		<SectionContainer
			title="Main Projects"
			count="03."
			id={SectionID.mainProjects}
		>
			{PROJECT_DATA.map((pro, i) => (
				<MainProject key={i} {...pro} />
			))}
		</SectionContainer>
	);
}
