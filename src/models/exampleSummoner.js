var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ExampleSummonerSchema = new Schema({
  data: {},
  createdAt: {
    type: Date,
    default: Date.now
  }
})

var ExampleSummoner = mongoose.model('ExampleSummoner', ExampleSummonerSchema)

module.exports = ExampleSummoner;