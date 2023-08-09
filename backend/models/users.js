const mongoose = require("mongoose");

const ERRORS = {
  required: `field required`,
  empty: `This field cannot be empty`,
};

const DEFAULT_PHOTO =
  "https://res.cloudinary.com/dvmipcwy7/image/upload/v1690571975/ezulphnetoa65bodxzwn.jpg";
const DEFAULT_LANGUAGE = "FR";
const DEFAULT_HOBBY = "voyage";
const DEFAULT_DESCRIPTION = "Je dois mettre à jour mon profil !";

const citySchema = mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
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
  token: String, // Token pour l'authentification de l'utilisateur
  avatarUrl: { type: String, default: DEFAULT_PHOTO }, // URL de l'avatar de l'utilisateur
  description: { type: String, default: DEFAULT_DESCRIPTION }, // Description par défaut
  city: citySchema,
  spokenLanguages: [{ type: String, default: DEFAULT_LANGUAGE }],
  hobbies: [{ type: String, default: DEFAULT_HOBBY }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "bookings" }],
  chatChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: "chatChannels" }],
  canHost: { type: Boolean, default: false },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
