var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RankedLeagueSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*5,
    default: Date.now
  }
})

var RankedLeague = mongoose.model('RankedLeague', RankedLeagueSchema)

module.exports = RankedLeague;