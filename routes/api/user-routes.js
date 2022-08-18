const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    editUser,
    deleteUser,
    // addConnection,
    // deleteConnection
} = require('../../controllers/user-controller')

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:userId')
.get(getOneUser)
.put(editUser)
.delete(deleteUser);

// router.route('/:userId/connections/:connectionId')
// .post(addConnection)
// .delete(deleteConnection);


module.exports = router;