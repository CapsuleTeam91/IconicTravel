const mongoose = require('mongoose');

const ERRORS = {
	required: `field required`,
	empty: `This field cannot be empty`,
};

const DEFAULT_PHOTO =
	'https://res.cloudinary.com/dvmipcwy7/image/upload/v1690571975/cld-sample.jpg';
const DEFAULT_LANGUAGE = 'FR';
const DEFAULT_HOBBY = 'voyage';
const DEFAULT_DESCRIPTION = 'Je dois mettre à jour mon profil !';

const citySchema = mongoose.Schema({
	name: String,
	latitude: Number,
	longitude: Number,
});

const travelSchema = mongoose.Schema({
	destination: String,
	startDate: Date,
	endDate: Date,
	hostId: mongoose.Schema.ObjectId,
});

const userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	dateOfBirth: Date,
	email: {
		type: String,
		required: [true, ERRORS.required],
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, ERRORS.required],
	},
	token: String,
	avatarUrl: { type: String, default: DEFAULT_PHOTO },
	description: { type: String, default: DEFAULT_DESCRIPTION },
	city: citySchema,
	spokenLanguages: [{ type: String, default: DEFAULT_LANGUAGE }],
	hobbies: [{ type: String, default: DEFAULT_HOBBY }],
	travels: [travelSchema],
	canHost: { type: Boolean, default: false },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
