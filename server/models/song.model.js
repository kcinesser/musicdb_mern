const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statuses = Object.freeze({
  NotStarted: 'Not Started',
  InProgress: 'In Progress',
  Proficient: 'Proficient',
  Mastered: 'Mastered'
});

const songSchema = new Schema({
    title: { type: String, required: true,},
    artist: { type: String, required: true},
    difficulty: { type: Number },
    notes: [{ type: String }],
    album: { type: String},
    artist: { type: String, required: true },
    uploads: [{ type: String }],
    status: { type: String, enum: Object.values(Statuses)}
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;