const { ObjectId } = require('mongoose').Types;
const { Thought, Reaction, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          return res.json(thoughts);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .lean();
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }

          res.json({
            thought
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a course
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};