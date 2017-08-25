var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RealmsSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*60*24,
    default: Date.now
  }
})

var Realms = mongoose.model('Realms', RealmsSchema)

module.exports = Realms;