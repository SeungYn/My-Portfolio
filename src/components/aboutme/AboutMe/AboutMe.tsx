import SectionContainer from '@/components/common/section/SectionContainer/SectionContainer';
import Image from 'next/image';
import styles from './AboutMe.module.css';

import WithFadeUpTranslate from '@/components/container/WithFadeUpTranslate';
import { getBase64 } from '@/util/blurData';
import { SectionID } from '@/constant/sectionId';

export default async function AboutMe() {
	const base64Img = await getBase64('public/assets/sun.jpeg');

	return (
		<SectionContainer title="About Me" count="01." id={SectionID.aboutMe}>
			<WithFadeUpTranslate>
				<div className="flex flex-col gap-8 md:flex-row">
					<div className="basis-[70%]">
						<div className="mb-16 text-xl">
							<p>
								다나와에서 프론트엔드 개발자로 일하며, Next.js 기반 플랫폼
								마이그레이션 업무를 담당하고 있습니다.
							</p>
							<p className="mt-4">
								컴포넌트 설계, 렌더링 최적화, 상태 관리, 협업을 고려한 코드
								구조화에 관심이 많으며 더 나은 사용자 경험을 만드는 데 집중하고
								있습니다.
							</p>
						</div>
					</div>
					<div
						className={`relative mx-auto aspect-square h-[300px] w-[300px] max-w-[300px]  md:!w-[70%]  ${styles.imgBorder}`}
					>
						<Image
							src="/assets/basic_profile_image.jpeg"
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
