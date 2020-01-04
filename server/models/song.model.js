const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statuses = ['', 'Not Started', 'In Progress', 'Proficient', 'Mastered'];
const Genres = ['', 'Folk', 'Blues', 'Rock', 'Classical', 'Metal', 'Soundtrack', 'Pop'];
const Instruments = ['', 'Acoustic Guitar', 'Electric Guitar', 'Piano'];

const songSchema = new Schema({
  user_id: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true},
  title: { type: String, required: true,},
  difficulty: { type: Number, default: 0 },
  notes: {type: String, default: ''},
  album: { type: String},
  uploads: [{ type: String }],
  status: { type: String, enum: Statuses, default: 'Not Started'},
  instrument: { type: String, enum: Instruments, default: ''},
  genre: { type: String, enum: Genres, default: ''},
  spotify_id: { type: String, default: ''},
  youtube_id: { type: String, default: ''}
}, {
  timestamps: true,
});

module.exports = mongoose.model('Song', songSchema);