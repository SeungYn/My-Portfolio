import { EmailDateType } from '@/types';

export async function postMail({ title, message, email }: EmailDateType) {
	const res = await fetch('/api/email', {
		method: 'POST',
		body: JSON.stringify({ title, message, email }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || '서버 에러 발생');
	return data;
}
