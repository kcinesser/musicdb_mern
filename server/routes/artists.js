const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Artist.find().sort('name')
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const image_url = req.body.image_url;
  const spotify_id = req.body.spotify_id;

  const newArtist = new Artist({name, spotify_id, image_url});

  console.log(newArtist)

  newArtist.save()
    .then(() => res.json(newArtist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Artist.findById(req.params.id)
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').put((req, res) => {
  Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/songs').put((req, res) => {
  const songs = {
    songs: req.body
  }

  Artist.findByIdAndUpdate(req.params.id, songs, {new: true})
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;