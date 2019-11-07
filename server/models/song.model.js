const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: { type: String, required: true,},
    artist: { type: String, required: true},
    difficulty: { type: Number },
    notes: [{ type: String }],
    album: { type: String}
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;