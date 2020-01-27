const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postGigSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Offer: {
    type: Number,
    required: true
  },
  Deadline: {
    type: Date,
    required: true
  },
  Negotiable: {
    type: Boolean,
    required: true
}
});

module.exports = mongoose.model('postGig', postGigSchema);