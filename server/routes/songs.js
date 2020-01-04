const router = require('express').Router();
let Song = require('../models/song.model');
let Artist = require('../models/artist.model');

// Get all songs for logged in user
router.route('/').get((req, res) => {
  Song.find({ user_id: req.query.user_id }).populate('artist').sort('artist.name')
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get song
router.route('/:id').get((req, res) => {
  Song.findById(req.params.id).populate('artist').populate('uploads')
    .then(song => res.json(song))
    .catch(err => res.status(400).json('Error: ' + err));
});

//New song
router.route('/add').post((req, res) => {
  newSong = new Song(req.body);
  
  Artist.findById(req.body.artist)
    .then(artist => {
      artist.songs.push(newSong);
      artist.save();
    })
    .catch(err => res.status(400).json('Error: ' + err));

  newSong.save()
    .then(() => res.json(newSong))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;