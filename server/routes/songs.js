const router = require('express').Router();
let Song = require('../models/song.model');
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Song.find()
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log(req.body)

  Artist.findByIdAndUpdate(req.body.artist_id)
  // newSong.save()
  //   .then(() => res.json(newSong))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Song.findByIdAndDelete(req.params.id)
    .then(() => res.json('Song deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Song.findById(req.params.id)
    .then(song => res.json(song))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;