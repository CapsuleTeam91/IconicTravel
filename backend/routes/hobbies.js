var express = require('express');
var router = express.Router();
// MODELS
const Hobby = require('../models/hobbies');
// UTILS
const { checkBody } = require('../modules/checkBody');

/* POST / - add a new hobby if does not already exists in db*/
router.post('/', async (req, res) => {
	const { hobby } = req.body;

	// Check if the user has not already been registered
	Hobby.findOne({ hobby: { $regex: new RegExp(hobby, 'i') } }).then((data) => {
		if (!data) {
			const newHobby = new Hobby({ hobby });

			newHobby.save().then(() => {
				res.json({ result: true });
			});
		} else {
			res.status(409).json({ result: false, error: 'Already exists' });
		}
	});
});

/* GET / - return all hobbies*/
router.get('/', (req, res) => {
	Hobby.find().then((hobbies) => res.json({ result: true, hobbies }));
});

module.exports = router;
