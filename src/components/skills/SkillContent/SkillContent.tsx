import { SkillCategoryList } from '../Skills/Skills';
import styles from './SkillContext.module.css';
import IconBackground from '@/components/common/icons/IconBackground/IconBackground';
import Image from 'next/image';

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
import JestIcon from '/public/assets/skills/icons/front/jest.svg';
import TestingLibraryIcon from '/public/assets/skills/icons/front/testing-library.svg';
import TailWindIcon from '/public/assets/skills/icons/front/tailwindcss-icon.svg';

//back svg
import SpringIcon from '/public/assets/skills/icons/back/spring-icon.svg';
import ExpressIcon from '/public/assets/skills/icons/back/express.svg';

//database svg
import MysqlIcon from '/public/assets/skills/icons/database/mysql-icon.svg';

//etc svg
import AwsEc2Icon from '/public/assets/skills/icons/etc/aws-ec2.svg';
import AwsS3Icon from '/public/assets/skills/icons/etc/aws-s3.svg';
import DockerIcon from '/public/assets/skills/icons/etc/docker-icon.svg';
import GitIcon from '/public/assets/skills/icons/etc/git-icon.svg';
import GithubIcon from '/public/assets/skills/icons/etc/github-octocat.svg';
import Gitlab from '/public/assets/skills/icons/etc/gitlab.svg';
import NetilifyIcon from '/public/assets/skills/icons/etc/netlify-icon.svg';
import VercelIcon from '/public/assets/skills/icons/etc/vercel-icon.svg';

const SkillList = [
	[
		{
			SkillIcon: (
				<IconBackground>
					<HTMLIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'HTML5',
			description: '• 기본적인 HTML 태그를 사용할 수 있습니다.',
		},
		{
			SkillIcon: (
				<IconBackground>
					<CSSIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'CSS',
			description: '• 순수 CSS만을 이용하여 레이아웃을 할 수 있습니다.',
		},
		{
			SkillIcon: (
				<IconBackground>
					<JavscriptIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Javacript',
			description: '• ES6+ 문법을 활용하여 코드를 작성 할 수 있습니다. ',
		},
		{
			SkillIcon: (
				<IconBackground>
					<TypescriptIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Typescript',
			description:
				'• 타입을 활용하여 명확한 코드를 작성할 수 있으며, 제네릭, 인덱싱, 유틸리티 타입을 사용할 수 있습니다.',
		},
		{
			SkillIcon: (
				<IconBackground>
					<JAVAIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Java',
			description:
				'• 학부생시절 재밌게 배웠던 언어이며, 2~3학년 동안 자바로 과제나, 프로그램을 작성했습니다.',
		},
	],
	[
		{
			SkillIcon: (
				<IconBackground>
					<ReactIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'React',
			description:
				'• 리액트로 여러 프로젝트를 해봤으며, ContextAPI, useReducer, useState, useCallBack, useMemo, Suspense를 활용 할 수 있습니다.',
		},
		{
			SkillIcon: (
				<IconBackground>
					<NextJSIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'NextJS',
			description: `• 상황별로 SSG, SSR, CSR를 활용할 수 있습니다. 
			• middleware와 API를 작성할 수 있습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<AxiosIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Axios',
			description: `• interceptors를 이용하여 에러와, 요청 전처리를 할 수 있습니다.
			• 재요청 로직을 프로젝트에 적용한 경험이 있습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<TailWindIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'TailwindCSS',
			description: `• 최근 즐겨 사용하고 있습니다. 프로젝트에 적용한 경험이 있습니다.`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<PostCSSIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'PostCSS',
			description: '• CSS 모듈을 활용하여 CSS 작성하는 것을 좋아합니다.',
		},
		{
			SkillIcon: (
				<IconBackground>
					<ReactQueryIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'TanstackQuery(ReactQuery) v3~5',
			description: `• API 로직 분리와 캐싱을 위해 사용해 왔으며, 프로젝트 적용 전 변경사항을 확인하며 적용해오고 있습니다.
				• SuspenseQuery, OptimisticUpdate를 활용할 수 있습니다.
				`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<div className="relative h-16 w-16 max-md:h-10 max-md:w-10">
						<Image
							src="/assets/skills/icons/front/zustand-icon.png"
							fill
							alt="zustand image"
						/>
					</div>
				</IconBackground>
			),
			title: 'Zustand',
			description: `• 최근 프로젝트에 전역 상태 관리를 위해 사용한 경험이 있습니다.
				• localStorage와 연동, reducer형태로 적용한 경험이 있습니다.
				`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<RecoilIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Recoil',
			description: `• 프로젝트에 전역 상태 관리를 위해 사용한 경험이 있습니다.
				• localStorageEffect를 이용하여 localStorage와 연동한 경험이 있습니다.
				`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<ReduxIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Redux',
			description:
				'• 프로젝트에 적용한 경험이 없지만, 혼자 리덕스가 무엇인지 알기 위해 사용해본 경험이 있습니다.',
		},
		{
			SkillIcon: (
				<IconBackground>
					<ReactRouterIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'React-Router-Dom v6',
			description: `• SPA 프로젝트의 네비게이션을 위해 적용한 경험이 있습니다.`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<JestIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Jest',
			description: `• React-Testing-Libary를 사용하기 위해 학습한 경험이 있습니다.`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<TestingLibraryIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'React-Testing-Libary',
			description: `• React-Testing-Libary를 사용하여 프로젝트에 적용한 경험이 있습니다.
			• 전체를 테스트 하지 않았지만, 어떻게 사용하는지를 알게되었습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<PlaywrightIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'PlayWright',
			description: `• 최근 프로젝트의 테스트를 눈으로 확인하며 하려고 사용해봤습니다.
			• 조금씩 적용하고 있습니다.
			`,
		},
	],
	[
		{
			SkillIcon: (
				<IconBackground>
					<ExpressIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Express',
			description: `• React와 Express를 학습 후 첫 간단한 프로젝트의 백엔드 프레임워크로 사용한 경험이 있습니다.
		`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<SpringIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Spring-Boot',
			description: `• 프로젝트에 사용한 경험은 없지만, 스프링부트가 무엇이고 어떻게 사용하는지 궁금해서 강의나 책을 보며 따라 해 본 경험이 있습니다.
		`,
		},
	],
	[
		{
			SkillIcon: (
				<IconBackground>
					<MysqlIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Mysql',
			description: `• 학부생 시절 배운 적이 있습니다.
	`,
		},
	],
	[
		{
			SkillIcon: (
				<IconBackground>
					<AwsEc2Icon className={styles.svg} />
				</IconBackground>
			),
			title: 'AWS-EC2',
			description: `• NextJS 프로젝트를 EC2에 배포해 본 경험이 있습니다.
`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<AwsS3Icon className={styles.svg} />
				</IconBackground>
			),
			title: 'AWS-S3',
			description: `• React 프로젝트를 S3에 배포해 본 경험이 있습니다..
`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<DockerIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Docker',
			description: `• NextJS 프로젝트를 Docker 파일을 작성하여 배포해 본 경험이 있습니다.
`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<GitIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Git',
			description: `• 코드 저장과 버전 기록을 위해 사용했습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<GithubIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Github',
			description: `• 외부 저장과 협업을 위해 사용하였습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<Gitlab className={styles.svg} />
				</IconBackground>
			),
			title: 'Gitlab',
			description: `• 외부 저장과 협업을 위해 사용하였습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<NetilifyIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Netlify',
			description: `• React 프로젝트를 배포해 본 경험이 있습니다.
			`,
		},
		{
			SkillIcon: (
				<IconBackground>
					<VercelIcon className={styles.svg} />
				</IconBackground>
			),
			title: 'Vercel',
			description: `• NextJS 프로젝트를 배포해 본 경험이 있습니다.
			`,
		},
	],
];

type Props = {
	categoryIndex: number;
};

export default function SkillContent({ categoryIndex }: Props) {
	return SkillCategoryList.map((cate) => (
		<div
			key={cate.index}
			className={`${styles.content} ${
				categoryIndex === cate.index
					? styles.contentFadeIn
					: styles.contentFadeOut
			}`}
		>
			<h3 className="mb-6 text-xl font-semibold leading-10 text-lightest-slate">
				Skill Stack <span className="text-green">@ {cate.title}</span>
			</h3>
			{SkillList[cate.index].map(({ description, SkillIcon, title }, index) => (
				<ul key={cate.index + '' + index}>
					<li className="mb-4 flex gap-4">
						<IconBackground>{SkillIcon}</IconBackground>
						<div>
							<h3 className="mb-2 text-xl text-lightest-slate">{title}</h3>
							<p className="whitespace-pre-line text-lg">{description}</p>
						</div>
					</li>
				</ul>
			))}
		</div>
	));

	// <div>
	//   <h3 className='text-xl font-semibold text-lightest-slate leading-10'>
	//     Skill Stack <span className='text-green'>@ FrontEnd</span>
	//   </h3>
	//   <ul>
	//     <li className='flex'>
	//       <IconBackground>
	//         <AxiosIcon width={60} height={60} />
	//       </IconBackground>
	//       <p>
	//         아무 텍스트를 적는 중 이에용 어나날안녕상 가나다라도란ㅁ
	//         소ㅠㅈㄷ소ㅠㅑ
	//       </p>
	//     </li>
	//     <li>
	//       <ReactIcon width={60} height={60} />
	//     </li>
	//   </ul>
	// </div>
}
