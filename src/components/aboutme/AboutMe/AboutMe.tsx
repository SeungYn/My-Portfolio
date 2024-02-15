import SectionContainer from '@/components/common/section/SectionContainer/SectionContainer';
import Image from 'next/image';
import styles from './AboutMe.module.css';

import WithFadeUpTranslate from '@/components/container/WithFadeUpTranslate';
import { getBase64 } from '@/util/blurData';

export default async function AboutMe() {
	const base64Img = await getBase64('public/assets/sun.jpeg');

	return (
		<SectionContainer title="About Me" count="01.">
			<WithFadeUpTranslate>
				<div className="flex flex-col gap-8 md:flex-row">
					<div className="basis-[70%]">
						<div className="mb-16 text-xl">
							<h3 className="mb-3 text-2xl text-lightest-slate">
								[첫인상을 주는 프론트엔드]
							</h3>
							<p>
								학부생 시절 PHP, JSP, Express, React를 활용한 웹 개발 경험이
								있으며, 사용자에게 먼저 보여지는 프론트엔드에 흥미를 느껴
								프론트엔드에 집중하고 있습니다.
							</p>
						</div>
						<div className="mb-16 text-xl">
							<h3 className="mb-3 text-2xl text-lightest-slate">
								[성장에 대한 즐거움]
							</h3>
							<p>
								새로운 프로젝트를 시작할 때마다, 단순히 이전에 사용하던 기술을
								활용하는 것이 아닌, 이전 프로젝트에서 아쉬웠던 부분을 개선하고
								새로운 코드 스타일이나 기술을 적용하는 것에 큰 즐거움을
								느낍니다. 이는 개발에 있어서의 성장을 위한 동력이 되어주고
								있습니다.
							</p>
						</div>
						<div className="mb-16 text-xl">
							<h3 className="mb-3 text-2xl text-lightest-slate">
								[꺾이지 않는 마음]
							</h3>
							<p>
								프론트엔드 개발은 대부분 혼자 진행했습니다. 이 과정에서 모든
								것을 스스로 찾아내고 해결해야 했기 때문에, 때론 기능 구현에
								며칠이 걸리기도 했습니다. 하지만 이런 과정을 통해 개발에 있어서{' '}
								{'"'}
								해결할 수 없는 문제는 없다{'"'}는 확신을 가지게 되었습니다.
								이로써, 꺾이지 않는 마음으로 어떤 문제든 극복할 수 있다는
								자신감을 얻게 되었습니다.
							</p>
						</div>
					</div>
					<div
						className={`relative mx-auto aspect-square h-[300px] w-[300px] max-w-[300px]  md:!w-[70%]  ${styles.imgBorder}`}
					>
						<Image
							src="/assets/sun.jpeg"
							fill
							alt="프로필 이미지"
							sizes="300px"
							blurDataURL={base64Img}
							placeholder="blur"
							className="z-10 -translate-x-2 -translate-y-2 rounded-lg"
						/>
					</div>
				</div>
			</WithFadeUpTranslate>
		</SectionContainer>
	);
}
