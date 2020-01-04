const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let uploadSchema = new Schema({
    description: { type: String },
    fileLink: { type: String },
    url: { type: String },
    s3_key: { type: String },
    song_id: { type: Schema.Types.ObjectId, ref: 'Song', required: true }
  }, {
    timestamps: true
  });

module.exports = mongoose.model("Upload", uploadSchema);