var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChampionMasterySchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*15,
    default: Date.now
  }
})

var ChampionMastery = mongoose.model('ChampionMastery', ChampionMasterySchema)

module.exports = ChampionMastery;