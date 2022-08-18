const { User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            // .populate('connections')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            // .populate('connections')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    editUser(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json({ message: 'User deleted.' })
                // : Thought.findAll({ username: user.username})
                // .then(videos)
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            })
    },
    // addConnection(req, res) {
    //     User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $addToSet: { connections: req.params.connectionId } },
    //         { new: true })
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'No user found with that id' })
    //                 : res.json('connection added')
    //         )
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).json(err);
    //         });
    // },
    // deleteConnection(req, res) {
    //     User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $pull: { connections: req.params.connectionId } },
    //         { new: true })
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'No user found with that id' })
    //                 : res.json('connection deleted')
    //         )
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).json(err);
    //         });
    // },
};