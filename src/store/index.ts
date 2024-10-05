'use client';

import { configureStore } from '@reduxjs/toolkit';
import { mainLoadingSliceReducer } from './slices/loading';

const store = () =>
	configureStore({
		reducer: {
			mainLoading: mainLoadingSliceReducer,
		},
	});
export default store;

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
