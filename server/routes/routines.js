const router = require('express').Router();
let Song = require('../models/song.model');
let Routine = require('../models/routine.model');
let User = require('../models/user.model');

//Get all routines for the signed in users
router.route('/').get((req, res) => {
  Routine.find({ user_id: req.query.user_id }).sort('-createdAt')
    .then(routines => res.json(routines))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get indiv routine
router.route('/:id').get((req, res) => {
  Routine.findById(req.params.id).populate({ path: 'songs', populate: { path: 'artist', model: 'Artist'}, populate: { path: 'uploads', model: 'Upload' } })
    .then(routine => res.json(routine))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Create a new routine
router.route('/add').post((req, res) => {
  const newRoutine = new Routine(req.body);

  newRoutine.save()
    .then(() => res.json(newRoutine))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add song to a routine
router.route('/:id/song').put((req, res) => {
  Routine.findById(req.body.routine_id)
    .then(routine => {
      routine.songs.indexOf(req.body.song_id) === -1 ? routine.songs.push(req.body.song_id) : console.log("This item already exists");
      routine.save();
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update order of a routine
router.route('/:id/order').put((req, res) => {
  Routine.findById(req.params.id)
    .then(routine => {
      routine.songs = [];
      req.body.map(item => {
        routine.songs.push(item._id);
      })
      routine.save();
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Updated last played time
router.route('/:id/timestamp').put((req, res) => {
  let userId = req.body.userID;
  let duration = req.body.duration;
  let routineId = req.params.id;

  let record = JSON.stringify({ routineID: routineId, duration: duration, date: Date.now() });

  Routine.findById(routineId)
    .then(routine => {
      routine.lastPlayed = Date.now();
      routine.playCount = routine.playCount + 1;
      routine.save();
    })
    .catch(err => res.status(400).json('Error: ' + err));

  User.findById(userId)
    .then(user => {
      user.records.push(record);
      user.save();
    })
    .catch(err => {console.log});
});


module.exports = router;