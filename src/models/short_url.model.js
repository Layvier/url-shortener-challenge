const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;


const shortUrlSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  original_url: String
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
