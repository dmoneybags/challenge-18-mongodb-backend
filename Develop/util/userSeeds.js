const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;
const { User } = require('../models');
const connection = require('../config/connection');

connection.once('open', async () => {
    console.log('Connected to MongoDB');

    try {

        // Seed data
        const users = [
            {
                userName: 'Alice',
                email: 'alice@example.com',
                thoughts: [],
                friends: [],
            },
            {
                userName: 'Bob',
                email: 'bob@example.com',
                thoughts: [],
                friends: [],
            },
            {
                userName: 'Charlie',
                email: 'charlie@example.com',
                thoughts: [],
                friends: [],
            },
        ];

        // Create users
        const createdUsers = await User.insertMany(users);

        // Add friends to Alice
        createdUsers[0].friends.push(createdUsers[1]._id, createdUsers[2]._id);
        await createdUsers[0].save();

        console.log('Seeding complete');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        // Close the connection
        mongoose.disconnect();
    }
});