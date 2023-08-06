const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    message: String,
    createdAt: Date
});

const chatChannelSchema = mongoose.Schema({
    name: String,
    messages: messageSchema,
    createdAt: Date
});

const ChatChannel = mongoose.model('chatChannels', chatChannelSchema);

module.exports = ChatChannel;
