var express = require('express');
var router = express.Router();
const Pusher = require('pusher');

const User = require('../models/users');
const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// Join chat
router.put('/users/:chatname/:username', (req, res) => {
  pusher.trigger(req.params.chatname, 'join', {
    username: req.params.username,
  });

  res.json({ result: true });
});

// Leave chat
router.delete('/users/:chatname/:username', (req, res) => {
  pusher.trigger(req.params.chatname, 'leave', {
    username: req.params.username,
  });

  res.json({ result: true });
});

// Send message
router.post('/message/:chatname', async (req, res) => {
  pusher.trigger(req.params.chatname, 'message', req.body);

  res.json({ result: true });
});

router.get(`/:token`, (req, res) => {
  User.findOne({ token: req.params.token }).populate({
    path: 'chatChannels',
    populate: [{ path: 'traveler' }, { path: 'host' }]
  })
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