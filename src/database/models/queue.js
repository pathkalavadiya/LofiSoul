// src/database/models/queue.js
const mongoose = require('mongoose');

const QueueTrackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String },
    duration: { type: Number },
    requestedBy: { type: String }, // discord user id
    addedAt: { type: Date, default: Date.now }
}, { _id: false });

const QueueSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true, index: true },
    tracks: { type: [QueueTrackSchema], default: [] },
    currentIndex: { type: Number, default: 0 }, // pointer to current track
    isPlaying: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

QueueSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Queue', QueueSchema);
