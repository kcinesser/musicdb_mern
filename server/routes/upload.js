require("dotenv").config();

const express = require("express");
const router = express.Router();
const multer = require("multer");

var AWS = require("aws-sdk");

let Song = require('../models/song.model');
const Upload = require("../models/upload.model");

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Get all Documents s Routes
router.route("/").get((req, res, next) => {
  Upload.find(
    {},
    null,
    {
      sort: { createdAt: 1 }
    },
    (err, docs) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(docs);
    }
  );
});

// Route to get a single existing GO data (needed for the Edit functionality)
router.route("/:id").get((req, res, next) => {
  Upload.findById(req.params.id, (err, go) => {
    if (err) {
      return next(err);
    }
    res.json(go);
  });
});

// route to upload a pdf upload file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
router.post("/:id/new", upload.single("file"), function(req, res) {
  const file = req.file;
  const song_id = req.params.id

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  var params = {
    Bucket: process.env.AWS_BUCKET_NAME + '/' + song_id,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.send({ data });

      var newFileUploaded = {
        description: req.body.description,
        fileLink: file.originalname,
        s3_key: params.Key,
        song_id: song_id,
        url: data.Location
      };

      var upload = new Upload(newFileUploaded);

      upload.save(function(error, newFile) {
        if (error) {
          throw error;
        }

        Song.findById(song_id)
          .then(song => {
            song.uploads.push(upload);
            song.save();
          })
          .catch(err => res.status(400).json('Error: ' + err));
      });
    }
  });
});

// Route to edit existing record's description field
// Here, I am updating only the description in this mongo record. Hence using the "$set" parameter
router.route("/edit/:id").put((req, res, next) => {
  Upload.findByIdAndUpdate(
    req.params.id,
    { $set: { description: Object.keys(req.body)[0] } },
    { new: true },
    (err, updateDoc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(updateDoc);
    }
  );
});

// Router to delete a upload file
router.route("/:id").delete((req, res, next) => {
  Upload.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    //Now Delete the file from AWS-S3
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: result.s3_key
    };

    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "200",
          responseType: "string",
          response: "success"
        });
      }
    });
  });
});

module.exports = router;