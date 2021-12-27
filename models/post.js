const mongoose = require('mongoose');

// Define Schemes
const PostSchema = new mongoose.Schema({
  user: { type: String, required: true},
  title: { type: String, required: true },
  body: { type: String }
},
{
  timestamps: true
});

module.exports = mongoose.model('post', PostSchema);