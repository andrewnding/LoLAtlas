var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestModelSchema = new Schema({
  name: String,
  payload: {
    data: []
  },
  createdAt: {
    type: Date,
    expires: 5,
    default: Date.now
  }
})

var TestModel = mongoose.model('TestModel', TestModelSchema)

module.exports = TestModel;