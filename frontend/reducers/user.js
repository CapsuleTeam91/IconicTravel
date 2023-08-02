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
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addData: (state, action) => {
			state.value = { ...state.value, ...action.payload };
		},
		addAvatar: (state, action) => {
			console.log("Image envoyé au reducer : ", action.payload)
			state.value.avatarUrl = action.payload;
		},
		clearData: (state, action) => {
			state.value = {
				firstname: null,
				lastname: null,
				dateOfBirth: null,
				email: null,
				token: null,
				avatarUrl: null,
				description: null,
				city: { name: null, latitude: null, longitude: null },
				spokenLanguages: [],
				hobbies: [],
				travels: [],
			}
		},
	},
});

export const { addData, addAvatar, clearData } = userSlice.actions;
export default userSlice.reducer;

/* REMINDER */
// const userSchema = mongoose.Schema({
// 	firstname: String,
// 	lastname: String,
// 	dateOfBirth: Date,
// 	email: {
// 		type: String,
// 		required: [true, ERRORS.required],
// 		lowercase: true,
// 		unique: true,
// 	},
// 	password: {
// 		type: String,
// 		required: [true, ERRORS.required],
// 	},
// 	token: String,
// 	avatarUrl: { type: String, default: DEFAULT_PHOTO },
// 	description: { type: String, default: DEFAULT_DESCRIPTION },
// 	city: citySchema,
// 	spokenLanguages: [{ type: String, default: DEFAULT_LANGUAGE }],
// 	hobbies: [{ type: String, default: DEFAULT_HOBBY }],
// 	travels: [travelSchema],
// 	isHosting: { type: Boolean, default: true },
// });
