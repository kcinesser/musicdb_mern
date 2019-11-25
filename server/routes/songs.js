const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/').get((req, res) => {
  Song.find()
    .then(songs => res.json(songs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const artist = req.body.artist;
  const album = req.body.album;

  const newSong = new Song({title, artist, album});

  newSong.save()
    .then(() => res.json(newSong))
    .catch(err => res.status(400).json('Error: ' + err));
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