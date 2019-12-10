const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  user_id: { type: String, required: true},
  name: { type: String, required: true,},
  image_url: String,
  spotify_id: String,
}, {
  timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;