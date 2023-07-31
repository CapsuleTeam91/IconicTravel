import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {
		firstname: null,
		lastname: null,
		dateOfBirth: null,
		email: null,
		password: null,
		avatar: null,
		description: null,
		city: null,
		spokenLanguages: [],
		hobbies: [],
	},
};

export const newUserSlice = createSlice({
	name: 'newUser',
	initialState,
	reducers: {
		// TODO : géréer les entrées une par une  - attention aux doublons d'infos !
		addData: (state, action) => {
			console.log({ ...state.value, ...action.payload });
			state.value = { ...state.value, ...action.payload };
		},
		addAvatar: (state, action) => {
			state.value.avatar = action.payload;
		},
	},
});

export const { addData, addAvatar } = newUserSlice.actions;
export default newUserSlice.reducer;

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
// 	avatar: { type: String, default: DEFAULT_PHOTO },
// 	description: { type: String, default: DEFAULT_DESCRIPTION },
// 	city: { type: String, default: null }, // if no city registered display create profil screen at connexion ?
// 	spokenLanguages: [{ type: String, default: DEFAULT_LANGUAGE }],
// 	hobbies: [{ type: String, default: DEFAULT_HOBBY }],
// 	travels: [travelSchema],
// 	isHosting: { type: Boolean, default: true },
// });
