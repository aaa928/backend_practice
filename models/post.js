const mongoose = require('mongoose');

// Define Schemes
const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
  title: { type: String, required: true },
  body: { type: String }
},
{
  timestamps: true
});

module.exports = mongoose.model('post', PostSchema);