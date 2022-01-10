// const mongoose = require('mongoose'); 
import mongoose from 'mongoose';

// Define Schemes
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  phone_number: { type: String, unique: true },
  gender: { type: String, default: '중성' },
  blog: [{type: mongoose.Schema.Types.ObjectId, ref:"post"}]
},
{
  timestamps: true
});

export default mongoose.model('user', UserSchema);
// module.exports = mongoose.model('user', UserSchema);