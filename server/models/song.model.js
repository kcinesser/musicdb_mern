const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: { type: String, required: true,},
    artist: { type: String, required: true},
    difficult: { type: Number },
    notes: [{ type: String }]
}, {
  timestamps: true,
});

const User = mongoose.model('Song', songSchema);

module.exports = User;