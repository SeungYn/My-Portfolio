import {
	FolderIcon,
	GitHubIcon,
	ShareIcon,
} from '@/components/common/icons/react-icons';
import WithFadeUpTranslate from '@/components/container/WithFadeUpTranslate';
import { Fragment, ReactNode } from 'react';

type SubProject = {
	title: ReactNode;
	links: { git?: string; page?: string };
	description: string;
	skills: string[];
};
const SUB_PROJECTS: SubProject[] = [
	{
		title: (
			<a
				href="/f"
				target="_blank"
				className="static before:absolute before:left-0 before:top-0 before:z-0 before:h-full before:w-full before:content-['']"
			>
				SeYn Portfolio
			</a>
		),
		links: { git: 'test' },
		description: `<a href="https://github.com/bchiang7" target="_blank" style="color:#64ffda; z-index:30;">
    Brittany Chiang</a>의 포트폴리오 디자인을 참고하여 포트폴리오를 제작했습니다.`,
		skills: ['NextJS v14', 'TailwindCSS', 'React-Notion-X'],
	},
];

export default function SubProjects() {
	const projectInner = (project: SubProject) => {
		const { title, links, description, skills } = project;
		const { git, page } = links;
		return (
			<li className="relative rounded-md bg-light-navy px-7 py-8 transition-all hover:-translate-y-4">
				<header className="z-10 mb-4 flex items-center justify-between [&_a]:z-10">
					<FolderIcon className="text-4xl" />
					<div className="flex items-center justify-between gap-4">
						{git && (
							<a href={git} target="_blank">
								<GitHubIcon size={24} />
							</a>
						)}
						{page && (
							<a href={page} target="_blank">
								<ShareIcon size={24} />
							</a>
						)}
					</div>
				</header>
				<h3 className="mb-4 text-xl text-lightest-slate">{title}</h3>
				<div
					className="z-10 mb-4"
					dangerouslySetInnerHTML={{
						__html: description,
					}}
				/>
				<footer>
					<ul className="flex flex-wrap text-sm [&>li]:mr-4">
						{skills.map((i) => (
							<li key={i}>{i}</li>
						))}
					</ul>
				</footer>
			</li>
		);
	};

	return (
		<section className="flex flex-col items-center gap-16 py-20">
			<WithFadeUpTranslate>
				<h2 className="text-3xl font-semibold text-lightest-slate">
					Sub Projects
				</h2>
			</WithFadeUpTranslate>
			<ul className="grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
				{SUB_PROJECTS.map((pro, i) => (
					<WithFadeUpTranslate key={i} delay={i}>
						<Fragment>{projectInner(pro)}</Fragment>
					</WithFadeUpTranslate>
				))}
			</ul>
		</section>
	);
}
