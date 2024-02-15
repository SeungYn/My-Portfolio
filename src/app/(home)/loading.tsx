import Image from 'next/image';

export default function RootLoading() {
	return (
		<section className="fixed z-50 flex h-screen w-screen items-center justify-center bg-navy">
			<Image
				src={'/assets/main-logo.jpg'}
				width={300}
				height={300}
				alt="로딩 이미지"
			/>
		</section>
	);
}
