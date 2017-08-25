var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChampionDataSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*60*24,
    default: Date.now
  }
})

var ChampionData = mongoose.model('ChampionData', ChampionDataSchema)

module.exports = ChampionData;