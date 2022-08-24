const router = require('express').Router();
const {
    getMessages
} = require('../../controllers/message-controller');

// api/messages
router.route('/')
    .get(getMessages);