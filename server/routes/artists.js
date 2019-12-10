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
  const name = req.body.name;
  const image_url = req.body.image_url;
  const spotify_id = req.body.spotify_id;
  const user_id = req.body.user_id;

  const newArtist = new Artist({user_id, name, spotify_id, image_url});

  newArtist.save()
    .then(() => res.json(newArtist))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get single artist
router.route('/:id').get((req, res) => {
  Artist.findById(req.params.id)
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));

  Song.find({ artist_id: req.params.id })
    .then(songs => console.log(songs))
});

//Delete artist
router.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update artist
router.route('/:id/update').put((req, res) => {
  Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;