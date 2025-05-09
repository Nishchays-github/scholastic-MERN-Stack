import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Explicitly add _id field
  timePosted: {
    type: Date,
    default: Date.now,
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: true }); // Ensure _id is enabled for subdocuments

const discussionSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  reviews: [reviewSchema]
}, { timestamps: true });

// Add indexes
discussionSchema.index({ userEmail: 1 });
discussionSchema.index({ 'reviews._id': 1 }); // Add index for review _id
discussionSchema.index({ 'reviews.timePosted': -1 });

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;