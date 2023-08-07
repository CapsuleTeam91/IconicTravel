import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_AVATAR } from '../utils/constants';

const initialState = {
	value: {
		firstname: null,
		lastname: null,
		dateOfBirth: null,
		email: null,
		token: null,
		avatarUrl: DEFAULT_AVATAR,
		description: null,
		city: { name: null, latitude: null, longitude: null },
		spokenLanguages: [],
		hobbies: [],
		travels: [],
		canHost: false,
	},
	// logs: {
	// 	email: '',
	// 	password: '',
	// },
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addData: (state, action) => {
			state.value = { ...state.value, ...action.payload };
		},
		addAvatar: (state, action) => {
			state.value.avatarUrl = action.payload;
		},
		// rememberPassword: (state, action) => {
		// 	state.logs = { ...action.payload };
		// },
		clearData: (state, action) => {
			state.value = {
				firstname: null,
				lastname: null,
				dateOfBirth: null,
				email: null,
				// token: null,
				avatarUrl: null,
				description: null,
				city: { name: null, latitude: null, longitude: null },
				spokenLanguages: [],
				hobbies: [],
				travels: [],
				canHost: false,
			};
		},
	},
});

export const { addData, addAvatar, rememberPassword, clearData } =
	userSlice.actions;
export default userSlice.reducer;
