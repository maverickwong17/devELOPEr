const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    editUser,
    deleteUser,
    addConnection,
    deleteConnection
} = require('../../controllers/user-controller')

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getOneUser)
    .put(editUser)
    .delete(deleteUser);

// /api/users/:userId/connections
router.route('/:userId/connections/')
.post(addConnection);

// /api/users/:userId/connections/:connectionId
router.route('/:userId/connections/:connectionId')
.delete(deleteConnection);

module.exports = router;