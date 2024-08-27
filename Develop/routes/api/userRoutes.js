const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    updateUser,
    createUser,
    deleteUser
} = require('../../controllers/userController');
const {
    createFriend
} = require('../../controllers/friendController');
const { createThought, deleteThought } = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/assignments
router.route('/:userId/thoughts').post(createThought);

// /api/users/:userId/assignments/:assignmentId
router.route('/:userId/thoughts/:thoughtId').delete(deleteThought);
 
router.route('/users/:userId/friends/:friendId').post(createFriend)

module.exports = router;