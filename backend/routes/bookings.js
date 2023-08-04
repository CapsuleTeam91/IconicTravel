var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings');

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
  newBooking.save().then(data => {
    res.json({ result: true })
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
      console.log(data)
    })
})

module.exports = router;