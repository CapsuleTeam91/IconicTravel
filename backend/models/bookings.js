const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  traveler: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Clé étrangère pour stocker l'ID de l'utilisateur voyageur lié à la réservation.
  host: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Clé étrangère pour stocker l'ID de l'utilisateur hôte lié à la réservation.
  done: { type: Boolean, default: false }, // Champ pour indiquer si la réservation est terminée, par défaut à false.
  startDate: Date,
  endDate: Date,
  status: { type: String, default: "Demande en attente" }, // Statut de la réservation
  adultsNumber: Number,
  childrenNumber: Number,
  babiesNumber: Number,
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
