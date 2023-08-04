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

module.exports = router;