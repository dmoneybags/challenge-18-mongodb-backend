const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
          }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
          }],

    }
);
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})
userSchema.set('toJSON', {
    virtuals: true
});

const User = model('user', userSchema);

module.exports = User;