'use client';

import store, { AppStore } from '@/store';
import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = store();
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
