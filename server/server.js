const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const songsRouter = require('./routes/songs');
const usersRouter = require('./routes/users');
const artistsRouter = require('./routes/artists');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/api/users', usersRouter);
app.use('/api/songs', songsRouter);
app.use('/api/artists', artistsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});