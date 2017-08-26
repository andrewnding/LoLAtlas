var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SummonerSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*60,
    default: Date.now
  }
})

var Summoner = mongoose.model('Summoner', SummonerSchema)

module.exports = Summoner;