const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const song = require('./song.model');

const Statuses = Object.freeze({
  NotStarted: 'Not Started',
  InProgress: 'In Progress',
  Proficient: 'Proficient',
  Mastered: 'Mastered'
});

const Genres = Object.freeze({
  Folk: 'Folk',
  Blues: 'Blues',
  Rock: 'Rock',
  Classical: 'Classical',
  Rock: 'Rock',
  Metal: 'Metal',
  Soundtrack: 'Soundtrack',
  Pop: 'Pop'
});

const Instruments = Object.freeze({
  Guitar: 'Guitar',
  Piano: 'Piano'
})

const songSchema = new Schema({
    title: { type: String, required: true,},
    difficulty: { type: Number, default: 0 },
    notes: String,
    album: { type: String},
    uploads: [{ type: String }],
    status: { type: String, enum: Object.values(Statuses), default: Statuses.NotStarted},
    instrument: { type: String, enum: Object.values(Instruments)},
    genre: { type: String, enum: Object.values(Genres)},
    spotify_id: String,
    youtube_id: String
}, {
  timestamps: true,
});

const artistSchema = new Schema({
    name: { type: String, required: true,},
    image_url: String,
    spotify_id: String,
    songs: [ songSchema ],
}, {
  timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;