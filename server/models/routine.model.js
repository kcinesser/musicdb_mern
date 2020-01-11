const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true,},
  songs: [ { type: Schema.Types.ObjectId, ref: 'Song', unique: true } ],
  lastPlayed: { type: Date, default: null },
  playCount: { type: Number, default: 0 },
  estTime: { type: Number, default: 0 }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Routine', routineSchema);
