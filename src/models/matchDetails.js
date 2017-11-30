var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MatchDetailsSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*5,
    default: Date.now
  }
})

var MatchDetails = mongoose.model('MatchDetails', MatchDetailsSchema)

module.exports = MatchDetails;