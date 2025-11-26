const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String },
    duration: { type: Number }, 
    requestedBy: { type: String }, 
    playedAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    discordId: { type: String, required: true, unique: true, index: true },
    username: { type: String }, 
    playHistory: { type: [TrackSchema], default: [] },
    totalPlays: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

UserSchema.methods.addTrackToHistory = async function(track) {
    this.playHistory.unshift(track);
    const MAX_HISTORY = 50;
    if (this.playHistory.length > MAX_HISTORY) {
        this.playHistory = this.playHistory.slice(0, MAX_HISTORY);
    }
    this.totalPlays = (this.totalPlays || 0) + 1;
    return this.save();
};

module.exports = mongoose.model('User', UserSchema);