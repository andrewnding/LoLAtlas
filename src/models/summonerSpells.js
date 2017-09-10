var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SummonerSpellsSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*60*24,
    default: Date.now
  }
})

var SummonerSpells = mongoose.model('SummonerSpells', SummonerSpellsSchema)

module.exports = SummonerSpells;