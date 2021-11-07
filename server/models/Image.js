const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = mongoose.Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  thumbnail: {
    type: String
  },
  privacy: {
    type: Number
  },
  type: {
    type: String
  },
  // date : {
  //   type: Date,
  //   default: Date.now(),
  // },  
  size :{
    type: Number,
  },
}, { timestamps: true})

module.exports = mongoose.model('Image', imageSchema);