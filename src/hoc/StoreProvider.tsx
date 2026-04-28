'use client';

import store, { AppStore } from '@/store';
import { PropsWithChildren, useState } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: PropsWithChildren) {
	const [appStore] = useState<AppStore>(() => store());

	return <Provider store={appStore}>{children}</Provider>;
}
