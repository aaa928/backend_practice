// const mongoose = require('mongoose'); 
import mongoose from 'mongoose';

// Define Schemes
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  phone_number: { type: String, required: true, unique: true },
  gender: { type: String, default: '중성' }
},
{
  timestamps: true
});

export default mongoose.model('user', UserSchema);
// module.exports = mongoose.model('user', UserSchema);