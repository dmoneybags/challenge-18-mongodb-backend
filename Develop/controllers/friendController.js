const { Thought, Reaction, User } = require('../models');

module.exports = {
    async createFriend(req, res) {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;  
      
          const user = await User.findByIdAndUpdate(
            userId,
            { $push: { friends: friendId } },
            { new: true, runValidators: true }
          );
      
          if (!user) {
            return res.status(404).json({ message: 'user not found' });
          }
      
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    }
};