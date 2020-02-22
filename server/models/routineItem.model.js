const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineItemSchema = new Schema({
  objectID: { type: String, required },
  order: { type: Number, required },
  duration: { type: Number, required },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Routine', routineSchema);
