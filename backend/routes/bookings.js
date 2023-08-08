var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings');
const User = require('../models/users');
const ChatChannel = require('../models/chatChannels');

router.post('/request', async (req, res) => {
	const {
		traveler,
		host,
		startDate,
		endDate,
		adultsNumber,
		childrenNumber,
		babiesNumber,
	} = req.body.travelDatas;

	// Vérifie si le traveler à déjà demandé un hosting à cette personne
	const sameBookings = await Booking.find({ $and: [{ traveler }, { host }] }); //vous avez déjà fait une demande
	const reverseBookings = await Booking.find({
		$and: [{ traveler: host }, { host: traveler }],
	}); //il a dejà fait une demande à vous

	console.log('Reverse : ', reverseBookings);

	const getDates = (startDate, endDate) => {
		let datesToCheckFromReq = [];
		let dif = new Date(endDate).getTime() - new Date(startDate).getTime();
		let daysNbr = dif / (1000 * 3600 * 24);
		for (let j = 0; j <= daysNbr; j++) {
			const result = new Date(startDate);
			const dateToCheck = result.setDate(result.getDate() + j);
			datesToCheckFromReq.push(new Date(dateToCheck).toLocaleDateString());
		}
		return datesToCheckFromReq;
	};

	// tableau de dates à checker de la requete
	const datesFromReq = getDates(startDate, endDate);

	//Si oui, vérifier si les dates se chevauchent
	if (sameBookings.length) {
		let datesToCheck = [];
		for (let i = 0; i < sameBookings.length; i++) {
			let dif =
				new Date(sameBookings[i].endDate).getTime() -
				new Date(sameBookings[i].startDate).getTime();
			let daysNbr = dif / (1000 * 3600 * 24);

			for (let j = 0; j <= daysNbr; j++) {
				const result = new Date(sameBookings[i].startDate);
				const dateToCheck = result.setDate(result.getDate() + j);
				datesToCheck.push(new Date(dateToCheck).toLocaleDateString());
			}
		}

		for (let i = 0; i < datesFromReq.length; i++) {
			if (datesToCheck.includes(datesFromReq[i])) {
				// 2 dates se supperposent...
				res.json({
					result: false,
					error: 'Vous avez déjà demandé un travel sur ce créneau',
				});
				return;
			}
		}
	}

	if (reverseBookings.length) {
		let datesToCheck = [];
		for (let i = 0; i < reverseBookings.length; i++) {
			let dif =
				new Date(reverseBookings[i].endDate).getTime() -
				new Date(reverseBookings[i].startDate).getTime();
			let daysNbr = dif / (1000 * 3600 * 24);

			for (let j = 0; j <= daysNbr; j++) {
				const result = new Date(reverseBookings[i].startDate);
				const dateToCheck = result.setDate(result.getDate() + j);
				datesToCheck.push(new Date(dateToCheck).toLocaleDateString());
			}
		}

		for (let i = 0; i < datesFromReq.length; i++) {
			if (datesToCheck.includes(datesFromReq[i])) {
				// 2 dates se supperposent...
				res.json({
					result: false,
					error: 'Cet host vous a déjà fait une demande sur ce créneau',
				});
				return;
			}
		}
	}

	const newBooking = new Booking({
		traveler,
		host,
		startDate,
		endDate,
		adultsNumber,
		childrenNumber,
		babiesNumber,
	});

	newBooking.save().then(async (data) => {
		const newChatChannel = new ChatChannel({
			host,
			traveler,
			name: traveler + host,
			messages: [],
			createdAt: new Date(),
		});

		const travelerFound = await User.findById(traveler);
		const hostFound = await User.findById(host);
		newChatChannel.save().then(async (resp) => {
			travelerFound.chatChannels.push(resp._id);
			travelerFound.bookings.push(data._id);
			hostFound.chatChannels.push(resp._id);
			hostFound.bookings.push(data._id);

			const newTraveler = await travelerFound.save();
			const newHost = await hostFound.save();

			if (!newTraveler || !newHost)
				return res
					.status(409)
					.json({ result: false, error: 'Can not add booking id to user' });

			res.json({
				result: true,
				travelerBookings: newTraveler.bookings,
				hostBookings: newHost.bookings,
			});
		});
	});
});

router.get('/:token', (req, res) => {
	User.findOne({ token: req.params.token })
		.populate({
			path: 'bookings',
			populate: [{ path: 'traveler' }, { path: 'host' }],
		})
		.then((userFound) => {
			res.json({
				result: true,
				user: userFound,
			});
		});
});

router.get(`/exists/:traveler/:host`, (req, res) => {
	Booking.findOne({
		traveler: req.params.traveler,
		host: req.params.host,
	}).then((data) => {
		if (data) {
			res.json({
				result: true,
				booking: data,
			});
		} else {
			res.json({
				result: false,
				error: 'Aucun contact trouvé',
			});
		}
	});
});

router.get(`/traveler/:token`, (req, res) => {
	User.findOne({ token: req.params.token })
		.populate('chatChannels')
		.then((data) => {
			if (data) {
				res.json({
					result: true,
					chats: data.chatChannels,
				});
			} else {
				res.json({
					result: false,
					error: 'Aucun contact trouvé',
				});
			}
		});
});

/* PATCH /update/:bookingId - update done */
router.patch('/update/:bookingId', (req, res) => {
	const { bookingId } = req.params;

	Booking.findByIdAndUpdate(bookingId, { status: 'Confirmé' }).exec();
});

/* DELETE /delete/:bookingId - remove the booking using its id */
router.delete('/delete/:bookingId', async (req, res) => {
	const { bookingId } = req.params;
	const booking = await Booking.findById(bookingId);

	//delete user
	User.findByIdAndUpdate(booking.traveler, {
		$pull: { bookings: bookingId },
	}).exec();
	User.findByIdAndUpdate(booking.host, {
		$pull: { bookings: bookingId },
	}).exec();

	const traveler = await User.findById(booking.traveler);
	const host = await User.findById(booking.host);
	const bookingsFound = await Booking.find({
		$and: [{ traveler }, { host }],
	});

	//delete chatchannel
	if (bookingsFound.length > 0) {
		ChatChannel.findOneAndDelete({ $and: [{ traveler }, { host }] }).then(
			(resp) => {
				User.findByIdAndUpdate(booking.traveler, {
					$pull: { chatChannels: resp._id },
				}).exec();
				User.findByIdAndUpdate(booking.host, {
					$pull: { chatChannels: resp._id },
				}).exec();
			}
		);
	}
	//delete booking
	Booking.deleteOne({ _id: bookingId }).then((deletedDoc) => {
		if (deletedDoc.deletedCount > 0) {
			res.json({ result: true });
		} else {
			res.json({ result: false });
		}
	});
});

module.exports = router;
