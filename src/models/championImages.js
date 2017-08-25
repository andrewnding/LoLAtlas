var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChampionImagesSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    expires: 60*60*24,
    default: Date.now
  }
})

var ChampionImages = mongoose.model('ChampionImages', ChampionImagesSchema)

module.exports = ChampionImages;