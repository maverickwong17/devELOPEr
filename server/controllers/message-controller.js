const { Message } = require('../models');

module.exports = {
    getMessages(req, res) {
        Message.find()
            .select('-__v')
            .then((messages) => res.json(messages))
            .catch((err) => res.status(500).json(err));
    }
}