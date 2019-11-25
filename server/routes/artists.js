const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Artist.find()
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const spotify_uri = req.body.spotify_uri;
  const image_url = req.body.image_url;

  const newArtist = new Song({name, spotify_uri, image_url});

  newArtist.save()
    .then(() => res.json(newArtist))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;