var express = require("express");
var router = express.Router();

const Booking = require("../models/bookings");
const User = require("../models/users");
const ChatChannel = require("../models/chatChannels");

// Endpoint pour créer une nouvelle demande de réservation
router.post("/request", async (req, res) => {
  const {
    traveler,
    host,
    startDate,
    endDate,
    adultsNumber,
    childrenNumber,
    babiesNumber,
  } = req.body.travelDatas; // Extraire les données de voyage de la demande de réservation

  // console.log('traveler envoyé dans la requete : ', traveler);
  // console.log('host envoyé dans la requete : ', host);

  // Vérifie si le traveler à déjà demandé un hosting à cette personne
  const sameBookings = await Booking.find({ $and: [{ traveler }, { host }] }); //vous avez déjà fait une demande
  const reverseBookings = await Booking.find({
    $and: [{ traveler: host }, { host: traveler }],
  }); //il a dejà fait une demande à vous

  //Si oui, vérifier si les dates se chevauchent
  if (sameBookings.length) {
    for (let i = 0; i < sameBookings.length; i++) {
      // Calculer la différence entre les dates de début et de fin
      let dif =
        new Date(sameBookings[i].endDate).getTime() -
        new Date(sameBookings[i].startDate).getTime();
      let daysNbr = dif / (1000 * 3600 * 24);

      let datesToCheck = [];
      for (let j = 0; j <= daysNbr; j++) {
        const result = new Date(sameBookings[i].startDate);
        const dateToCheck = result.setDate(result.getDate() + j);
        console.log("Booking en question : ", sameBookings[i]);
        console.log("Date à vérifier : ", new Date(dateToCheck));

        datesToCheck.push(new Date(dateToCheck));

        console.log(datesToCheck);
      }

      // tableau de dates à checker de la requete
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
    // Trouver les utilisateurs correspondants
    const travelerFound = await User.findOne({ _id: traveler });
    const hostFound = await User.findOne({ _id: host });

    if (
      travelerFound.bookings.includes(data._id) ||
      hostFound.bookings.includes(data._id)
    ) {
      res.json({
        result: false,
        error: "Booking déjà enregistré !",
      });
    } else {
      // Créer un nouveau canal de discussion
      const newChatChannel = new ChatChannel({
        host: hostFound._id,
        traveler: travelerFound._id,
        name: travelerFound._id + hostFound._id,
        messages: [],
        createdAt: new Date(),
      });

      newChatChannel.save().then(async (resp) => {
        // Mettre à jour les informations des utilisateurs
        travelerFound.chatChannels.push(resp._id);
        travelerFound.bookings.push(data._id);
        hostFound.chatChannels.push(resp._id);
        hostFound.bookings.push(data._id);

        const newTraveler = await travelerFound.save();
        const newHost = await hostFound.save();

        // Vérifier si les mises à jour ont réussi
        if (!newTraveler || !newHost)
          return res
            .status(409)
            .json({ result: false, error: "Can not add booking id to user" });
        // Réponse avec les informations mises à jour
        res.json({
          result: true,
          travelerBookings: newTraveler.bookings,
          hostBookings: newHost.bookings,
        });
      });
    }
  });
});
// Obtenir les détails de l'utilisateur avec un jeton donné
router.get("/:token", (req, res) => {
  User.findOne({ token: req.params.token })
    .populate({
      path: "bookings",
      populate: [{ path: "traveler" }, { path: "host" }],
    })
    .then((userFound) => {
      res.json({
        result: true,
        user: userFound,
      });
    });
});

// Vérifier l'existence d'une réservation entre un voyageur et un hôte
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
        error: "Aucun contact trouvé",
      });
    }
  });
});

//Obtenir les canaux de discussion d'un voyageur
router.get(`/traveler/:token`, (req, res) => {
  User.findOne({ token: req.params.token })
    .populate("chatChannels")
    .then((data) => {
      if (data) {
        res.json({
          result: true,
          chats: data.chatChannels,
        });
      } else {
        res.json({
          result: false,
          error: "Aucun contact trouvé",
        });
      }
    });
});

module.exports = router;
