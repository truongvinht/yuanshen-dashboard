import mongoose from 'mongoose'

/* PullSchema will correspond to a collection in your MongoDB database. */
const PullSchema = new mongoose.Schema({
  eventTime: {
    /* Date for this pull */
    type: Date,
    default: Date.now,
    required: [true, 'Please provide a date for this pull.'],
  },
  object_ref: {
    /* The object reference id */
    type: String,
    required: [true, "Please provide reference id."]
  },
  order_index: {
    /* The order index required for multi pull */
    type: Number,
    default: 0
  },
  banner: {
    /* Banner name */
    type: String,
    required: [true, 'Please provide banner name for this pull.'],
    maxlength: [256, 'Name cannot be more than 256 characters'],
  },
  uid: {
    /* user id */
    type: Number,
    required: [true, 'Please provide player uid for this pull.'],

  }
})

export default mongoose.models.Pull || mongoose.model('Pull', PullSchema)
