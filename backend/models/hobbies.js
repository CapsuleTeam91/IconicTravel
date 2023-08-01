const mongoose = require('mongoose');

const hobbySchema = mongoose.Schema({
	hobbies: String,
});

const Hobby = mongoose.model('hobbies', hobbySchema);

module.exports = Hobby;
