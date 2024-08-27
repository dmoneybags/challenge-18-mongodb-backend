const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => createdAt.toLocaleString()
        },
        userName: {
            type: String,
            required: true
        },
        //add reaction schema
        reactions: [reactionSchema]
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
thoughtSchema.set('toJSON', {
    virtuals: true
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;