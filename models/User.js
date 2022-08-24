import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // get back from google on auth
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  // from google
  firstName: {
    type: String,
    required: true,
  },
  // from google
  lastName: {
    type: String,
    required: true,
  },
  // from google
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model('User', UserSchema);
