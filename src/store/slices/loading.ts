'use client';

import { createSlice } from '@reduxjs/toolkit';

export const mainLoadingSlice = createSlice({
	name: 'mainLoading',
	initialState: {
		isFinshLoading: false,
	},
	reducers: {
		toggleLoading: (s) => {
			s.isFinshLoading = !s.isFinshLoading;
		},
		onEndLoading: (s) => {
			s.isFinshLoading = true;
		},
		onStartLoading: (s) => {
			s.isFinshLoading = false;
		},
	},
});

export const mainLoadingActions = mainLoadingSlice.actions;

export const mainLoadingSliceReducer = mainLoadingSlice.reducer;
