const {Thought} = require('../models');

module.exports = {
    async createReaction(req, res) {
        try {
          const { thoughtId } = req.params; 
          const reactionData = req.body; 
      
          const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: reactionData } },
            { new: true, runValidators: true }
          );
      
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },
    async deleteReaction(req, res) {
        try {
          const { thoughtId, reactionId } = req.params;
      
          const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId } } },
            { new: true }
          );
      
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    }
}