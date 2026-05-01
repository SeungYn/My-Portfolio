import SectionContainer from '@/components/common/section/SectionContainer/SectionContainer';
import WithFadeUpTranslate from '@/components/container/WithFadeUpTranslate';
import { SectionID } from '@/constant/sectionId';

const EXPERIENCE_LIST = [
	{
		company: '커넥트웨이브(다나와)',
		role: 'Frontend Developer',
		works: [
			{
				period: '2026.01 - 현재',
				projects: ['다나와 가격검색 페이지 플랫폼 마이그레이션'],
			},
			{
				period: '2024.12 - 2025.12',
				projects: [
					'Next.js 도입 및 Docker 기반 CI/CD 자동화 구축',
					'자동차 TCO PC/Mobile 페이지 개발',
					'렌터카 알림톡 페이지 개발',
					'자동차 소모품 섹션 개발',
				],
			},
		],
	},
];

export default function Experience() {
	return (
		<SectionContainer
			title="Experience"
			count="02."
			id={SectionID.experience}
		>
			<WithFadeUpTranslate>
				<ol className="flex flex-col gap-10">
					{EXPERIENCE_LIST.map(({ company, role, works }) => (
						<li key={company} className="text-xl">
							<header className="mb-6">
								<h3 className="text-2xl font-semibold text-lightest-slate">
									{company}
								</h3>
								<p>{role}</p>
							</header>
							<ul className="flex flex-col gap-8">
								{works.map(({ period, projects }) => (
									<li key={period}>
										<p className="mb-3 text-sm text-green">{period}</p>
										<ul className="flex flex-col gap-3">
											{projects.map((project) => (
												<li
													key={project}
													className="relative pl-6 before:absolute before:left-0 before:text-green before:content-['▹']"
												>
													{project}
												</li>
											))}
										</ul>
									</li>
								))}
							</ul>
						</li>
					))}
				</ol>
			</WithFadeUpTranslate>
		</SectionContainer>
	);
}
