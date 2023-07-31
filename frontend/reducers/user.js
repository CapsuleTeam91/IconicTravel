import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {
		firstname: null,
		lastname: null,
		dateOfBirth: null,
		email: null,
		password: null,
		avatarUrl: null,
		description: null,
		city: { name: null, latitude: null, longitude: null },
		spokenLanguages: [],
		hobbies: [],
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addData: (state, action) => {
			// const payloadKeys = Object.keys(action.payload); //get payload object keys
			// const stateKeys = Object.keys(state.value); //get state value object keys
			// // state.value already have property ? update it : add it
			// payloadKeys.map((key) =>
			// 	stateKeys.includes(key)
			// 		? (state.value[key] = action.payload[key])
			// 		: (state.value = { ...state.value, ...action.payload[key] })
			// );

			state.value = { ...state.value, ...action.payload };
			console.log('Reducer: ', state.value);
		},
		addAvatar: (state, action) => {
			state.value.avatarUrl = action.payload;
		},
	},
});

export const { addData, addAvatar } = userSlice.actions;
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
