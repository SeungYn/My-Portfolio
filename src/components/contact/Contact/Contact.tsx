'use client';

import SpecialBtn from '@/components/common/button/SpecialBtn';
import { postMail } from '@/service/client/mail';
import { EmailDateType } from '@/types';
import dynamic from 'next/dynamic';
import {
	ChangeEventHandler,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react';
import { IoMdClose } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';
const Confeti = dynamic(() => import('@/components/common/Confetti/Confeti'), {
	ssr: false,
});

export default function Contact() {
	const dialog = useRef<HTMLDialogElement>(null);
	const [isMailPending, setIsMailPending] = useState(false);
	const [isSuccessSend, setIsSuccessSend] = useState(false);
	const [form, setForm] = useState<Required<EmailDateType>>({
		title: '',
		message: '',
		email: '',
	});

	const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
		e
	) => {
		const { value, name } = e.target;

		switch (name) {
			case 'email':
				return setForm((s) => ({ ...s, email: value }));
			case 'title':
				return setForm((s) => ({ ...s, title: value }));
			case 'message':
				return setForm((s) => ({ ...s, message: value }));
		}
	};

	const onSendMail = (data: EmailDateType) => {
		postMail(data)
			.then(() => {
				alert('메일이 성공적으로 전송되었습니다.');
				setIsSuccessSend(true);
			})
			.finally(() => setIsMailPending(false));
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setIsMailPending(true);
		onSendMail(form);
	};

	useEffect(() => {
		dialog.current?.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.nodeName === 'DIALOG') {
				dialog.current?.close();
			}
		});
	}, []);

	return (
		<section className="flex flex-col items-center py-40">
			<h2 className="mb-8 text-3xl font-semibold text-lightest-slate">
				Contact
			</h2>
			<p className="mb-14 text-lg">
				저와 함께 작업하고 싶거나, 더 많은 정보를 원하신다면 언제든지
				연락주세요. 새로운 기회를 기다리고 있습니다!
			</p>
			<SpecialBtn
				className="px-6 py-4 text-xl"
				onClick={() => {
					dialog.current?.showModal();
					setIsSuccessSend(false);
				}}
			>
				Send Mail!
			</SpecialBtn>
			<dialog
				ref={dialog}
				className="w-full max-w-3xl rounded-md border border-green bg-light-navy text-lightest-slate"
			>
				<header className="mb-4 flex items-center justify-between py-2">
					<div aria-hidden></div>
					<h2 className="text-xl">Send Mail</h2>
					<button className="px-2" onClick={() => dialog.current?.close()}>
						<IoMdClose size={20} />
					</button>
				</header>
				<form onSubmit={onSubmit} className="mb-10 flex flex-col gap-4 px-8">
					<label className="flex flex-col gap-1">
						<span className="text-lg font-semibold text-green">Title</span>
						<input
							onChange={onChange}
							name="title"
							type="text"
							required
							className="rounded-lg bg-lightest-navy px-4 py-1 text-lightest-slate"
						/>
					</label>
					<label className="flex flex-col gap-1">
						<span className="text-lg font-semibold text-green">Your Email</span>
						<input
							onChange={onChange}
							name="email"
							type="email"
							required
							className="rounded-lg bg-lightest-navy px-4 py-1 text-lightest-slate"
						/>
					</label>
					<label className="flex flex-col gap-1">
						<span className="text-lg font-semibold text-green">Message</span>
						<textarea
							name="message"
							onChange={onChange}
							required
							className="resize-none rounded-lg bg-lightest-navy px-4 py-4 text-lightest-slate"
							rows={20}
						/>
					</label>

					<div className="relative mt-8 flex w-full items-center justify-center ">
						<SpecialBtn
							className=" disabled:hover:none w-full text-xl leading-9 disabled:text-light-navy"
							disabled={isMailPending}
						>
							보내기
						</SpecialBtn>
						{isMailPending && (
							<ClipLoader size={17} className="absolute " color="#36d7b7" />
						)}
					</div>
				</form>
				{isSuccessSend && <Confeti />}
			</dialog>
		</section>
	);
}
