var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecentRankedMatchesSchema = new Schema({
  accountId: Number,
  data: {},
  createdAt: {
    type: Date,
    expires: 60*15,
    default: Date.now
  }
})

var RecentRankedMatches = mongoose.model('RecentRankedMatches', RecentRankedMatchesSchema)

module.exports = RecentRankedMatches;