var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings');
const User = require('../models/users');
const chatChannel = require('../models/chatChannels');

router.post('/request', (req, res) => {
  const {
    traveler,
    host,
    startDate,
    endDate,
    adultsNumber,
    childrenNumber,
    babiesNumber, } = req.body.travelDatas;
  const newBooking = new Booking({
    traveler,
    host,
    startDate,
    endDate,
    adultsNumber,
    childrenNumber,
    babiesNumber,
  })
  newBooking.save().then(async (data) => {
    console.log('les datas : ',data)
    const travelerFound = await User.findOne({ _id: traveler });
    const hostFound = await User.findOne({ _id: host });

	if(travelerFound.bookings.includes(data._id) || hostFound.bookings.includes(data._id)) {
		res.json( {
			result: false,
			error: 'Booking déjà enregistré !'
		})
	}else {
		travelerFound.bookings.push(data._id)
    hostFound.bookings.push(data._id)

		const newTraveler = await travelerFound.save();
    const newHost = await hostFound.save();
	
		if (!newTraveler || !newHost)
			return res
				.status(409)
				.json({ result: false, error: 'Can not add booking id to user' });

        
	
		res.json({ result: true, travelerBookings: newTraveler.bookings, hostBookings: newHost.bookings });
	}
  })
})

router.get('/', (req, res) => {

})

router.get(`/exists/:traveler/:host`, (req, res) => {
  Booking.findOne({ traveler: req.params.traveler, host: req.params.host })
    .then(data => {
      if (data) {
        res.json({
          result: true,
          booking: data
        })
      } else {
        res.json({
          result: false,
          error: 'Aucun contact trouvé'
        })
      }
    })
})

router.get(`/traveler/:traveler`, (req, res) => {
  Booking.find({ traveler: req.params.traveler })
    .then(data => {
      console.log('data trouvé : ', data)
      if (data.length !== 0) {
        res.json({
          result: true,
          bookings: data
        })
      } else {
        res.json({
          result: false,
          error: 'Aucun contact trouvé'
        })
      }
    })
})

module.exports = router;