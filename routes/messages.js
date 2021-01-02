const express = require('express');
const router = express.Router();

// libs
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next) => {
  Messages.list('@Room:RjSycIMY4', messages => {
    res.json(messages);
  });
});

module.exports = router;
