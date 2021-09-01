const { Thought, Reaction, User } = require('../models');
    getAllThoughts(req, res) {
    Thought.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
    
    Thought.create({thoughtText,username})
    .then((data) =>
      User.findByIdAndUpdate(userId, {
        $push: { thoughts: data._id },
      })
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  },

  findThought({ params, body }, res) {
    Thought.find({})
      .select('-__v')
      .populate({ path: 'reactions', select: '-__v' })
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },

  findOneThough({ params, body }, res) {
    Thought.findById(params.Id)
     .populate({ path: 'reactions', select: '-__v' })
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },

  updateOneThough({ params, body }, res) {
    Thought.findByIdAndUpdate(params.Id)
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },
  removeOneThough({ params, body }, res) {
    Thought.findByIdAndDelete(params.Id)
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },
  addReaction({ params, body }, res) {
    Reaction.create(body)
      .then((createdReaction) =>
        Thought.findByIdAndUpdate(params.thoughtId, {
          $push: { reactions: createdReaction._id },
        })
      )
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },
  removeReaction({ params }, res) {
    Reaction.findByIdAndDelete(params.reactionId)
      .then((deletedReaction) => {
        console.log('Deleted reaction with _id of:', deletedReaction._id);
        Thought.findByIdAndUpdate(params.thoughtId, {
          $pull: { reactions: params.reactionId },
        });
      })
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;