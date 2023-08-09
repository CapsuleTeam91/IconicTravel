const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Clé étrangère pour l'utilisateur lié au message
  message: String,
  createdAt: Date, // Date de création du message
});

const chatChannelSchema = mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Clé étrangère pour l'utilisateur hôte du canal
  traveler: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Clé étrangère pour l'utilisateur voyageur du canal
  name: String,
  messages: [messageSchema], // Liste des messages dans le canal
  createdAt: Date, // Date de création du canal
});

const ChatChannel = mongoose.model("chatChannels", chatChannelSchema);

module.exports = ChatChannel;
