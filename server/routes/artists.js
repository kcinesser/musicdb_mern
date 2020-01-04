const router = require('express').Router();
let Artist = require('../models/artist.model');
let Song = require('../models/song.model');

//Get all artists for the signed in users
router.route('/').get((req, res) => {
  Artist.find({ user_id: req.query.user_id }).sort('name')
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Create a new artist
router.route('/add').post((req, res) => {
  const newArtist = new Artist(req.body);

  newArtist.save()
    .then(() => res.json(newArtist))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get single artist
router.route('/:id').get((req, res) => {
  Artist.findById(req.params.id).populate('songs')
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete artist
router.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(artist => { 
      artist.songs.map(song => {
        Song.findByIdAndDelete(song)
          .then(() => res.json('Song deleted'))
          .catch(err => res.status(400).json('Error: ' + err));
      })

      res.json(artist)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update artist
router.route('/:id/update').put((req, res) => {
  Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;