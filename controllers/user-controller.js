const { User, Thought, Reaction } = require('../models');

const userController = {
  createUser({ params, body }, res) {
    console.log(body);
    User.create(body)
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },

  findUsers({ params, body }, res) {
    User.find({})
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },
  findOne({ params, body }, res) {
    User.findById(params.Id)
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },

updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.Id, body, { new: true, runValidators: true })
    .then(dbUserData => {
        console.log('Update',dbUserData )
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

removeUser ({ params, body }, res) {
    User.findByIdAndDelete(params.Id)
      .then((deletedUser) =>{
        return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      })
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },
  
  addFriend({ params }, res) {
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this userId' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  removeFriend({ params }, res) {
    console.log(params);
    
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this userId' });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;