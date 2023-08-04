const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  traveler: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  done: Boolean(false),
  startDate: Date,
  endDate: Date,
  status: String('pending'),
  adultsNumber: Number,
  childrenNumber: Number,
  babiesNumber: Number,
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;
