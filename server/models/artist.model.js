const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: { type: String, required: true,},
    spotify_uri: String,
    image_url: String,
    songs: []
}, {
  timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;