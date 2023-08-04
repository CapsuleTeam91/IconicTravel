var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings');

router.post('/request', (req, res) => {
  const newBooking = new Booking({

  })
})

router.get('/', (req, res) => {

})

module.exports = router;