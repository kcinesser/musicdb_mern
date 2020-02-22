const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const async = require('async');

require('dotenv').config();

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/user.model");
const Artist = require("../models/artist.model");
const Song = require("../models/song.model");
const Routine = require('../models/routine.model');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    //Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
    // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
        // Sign token
                jwt.sign(
                    payload,
                    process.env.SECRET_OR_KEY,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.get("/:id/dashboard", (req, res) => {
    let userId = req.params.id;
    var dashboard = {
        user: '',
        artists: [],
        songs: [],
        routines: []
     };

    User.findById(userId)
        .then(user => { 
            dashboard.user = user 

            Artist.find({ user_id: userId }).sort('-createdAt').limit(10)
                .then(artists => { 
                    dashboard.artists = artists 
                
                    Song.find({ user_id: userId }).populate('artist').sort('-createdAt').limit(10)
                        .then(songs => { 
                            dashboard.songs = songs 
                        
                            Routine.find({ user_id: userId }).sort('-createdAt').limit(10)
                                .then(routines => { 
                                    dashboard.routines = routines;

                                    Routine.find({ user_id: userId }).sort('-lastPlayed').limit(10)
                                        .then(routines => {
                                            dashboard.recentlyPlayed = routines;

                                            Routine.find({ user_id: userId }).sort('-playCount').limit(10)
                                                .then(routines => {
                                                    dashboard.mostPlayed = routines;

                                                    res.json(dashboard);
                                                })
                                        })
                                        .catch(err => res.status(400).json('Error: ' + err));
                                })
                                .catch(err => res.status(400).json('Error: ' + err));
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').put((req, res) => {
    let userId = req.params.id;
    let updatedUser = null;

    User.findById(userId).then(user => {
        user.password = req.body.password;
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
        });
    });
});

module.exports = router;