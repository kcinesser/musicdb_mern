const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true,},
  image_url: String,
  spotify_id: String,
  songs: [ { type: Schema.Types.ObjectId, ref: 'Song' } ]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Artist', artistSchema);
