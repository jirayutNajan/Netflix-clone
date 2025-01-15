import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    reueired: true,
    uniuqe: true
  },
  email: {
    type: String,
    required: true,
    uniuqe: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  searchHistory: {
    type: Array,
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;