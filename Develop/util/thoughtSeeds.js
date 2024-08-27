const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;
const { Thought } = require('../models');
const connection = require('../config/connection');

connection.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        // Clear existing thoughts
        await Thought.deleteMany({});

        // Seed data
        const thoughts = [
            {
                userName: 'Alice',
                reactions: [
                    { reactionBody: 'This is great!', username: 'Bob' },  // Corrected key
                    { reactionBody: 'Awesome thought!', username: 'Charlie' },  // Corrected key
                ],
            },
            {
                userName: 'Bob',
                reactions: [
                    { reactionBody: 'I totally agree!', username: 'Alice' },  // Corrected key
                ],
            },
            {
                userName: 'Charlie',
                reactions: [],
            },
        ];

        // Create thoughts
        await Thought.insertMany(thoughts);

        console.log('Seeding complete');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        // Close the connection
        mongoose.disconnect();
    }
});