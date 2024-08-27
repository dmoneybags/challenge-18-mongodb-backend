const { getThoughts, createThought, getSingleThought, deleteThought, updateThought } = require('../../controllers/thoughtController');
const { createReaction } = require('../../controllers/reactionController')

const router = require('express').Router();

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').get(createReaction);

module.exports = router;