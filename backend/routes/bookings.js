var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings');
const User = require('../models/users');
const ChatChannel = require('../models/chatChannels');

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
    console.log('les datas : ', data)
    const travelerFound = await User.findOne({ _id: traveler });
    const hostFound = await User.findOne({ _id: host });

    if (travelerFound.bookings.includes(data._id) || hostFound.bookings.includes(data._id)) {
      res.json({
        result: false,
        error: 'Booking déjà enregistré !'
      })
    } else {
      const newChatChannel = new ChatChannel({
        name: travelerFound._id + hostFound._id,
        messages: [],
        createdAt: new Date()
      })

      newChatChannel.save().then(async (resp) => {
        travelerFound.chatChannels.push(resp._id)
        travelerFound.bookings.push(data._id)
        hostFound.chatChannels.push(resp._id)
        hostFound.bookings.push(data._id)

        const newTraveler = await travelerFound.save();
        const newHost = await hostFound.save();

        if (!newTraveler || !newHost)
          return res
            .status(409)
            .json({ result: false, error: 'Can not add booking id to user' });



        res.json({ result: true, travelerBookings: newTraveler.bookings, hostBookings: newHost.bookings });
      })
    }
  })
})

router.get('/:token', (req, res) => {
  User.findOne({ token: req.params.token }).populate({
    path: 'bookings',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'traveler' }
  })
    .then(userFound => {
      res.json({
        result: true,
        user: userFound
      })
    })
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

router.get(`/traveler/:token`, (req, res) => {
  User.findOne({ token: req.params.token }).populate('chatChannels')
    .then(data => {
      console.log('data trouvé : ', data)
      if (data) {
        res.json({
          result: true,
          chats: data.chatChannels
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