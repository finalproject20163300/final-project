

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  result_user : {
    type: String,
  },
  name : {
    type: String
  },
  image_path : {
    type: String
  },
  accuracy : {
    type: Array
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


const Result = mongoose.model("Result", resultSchema);
// export model
module.exports = { Result, resultSchema };