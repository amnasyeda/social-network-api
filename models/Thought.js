const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      len:[1,280]
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
  },
  reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
},

);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;