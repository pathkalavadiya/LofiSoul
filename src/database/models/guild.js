// src/database/models/guild.js
const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true, index: true },
    prefix: { type: String, default: '/' }, // or any default
    defaultVolume: { type: Number, default: 80 }, // 0-100
    djRoleId: { type: String, default: null }, // role id for DJ permissions
    musicTextChannelId: { type: String, default: null }, // channel id for logs
    settings: {
        autoplay: { type: Boolean, default: false },
        repeatMode: { type: String, enum: ['none', 'track', 'queue'], default: 'none' }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

GuildSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Guild', GuildSchema);
