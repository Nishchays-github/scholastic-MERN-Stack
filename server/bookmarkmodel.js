import mongoose from 'mongoose';

const userBookmarkSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  bookmarkedSchools: [{
    schoolName: {
      type: String,
      required: true
    },
    schoolAddress: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true // adds createdAt and updatedAt
});

const UserBookmark = mongoose.model('UserBookmark', userBookmarkSchema);

export default UserBookmark;