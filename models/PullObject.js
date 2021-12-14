import mongoose from 'mongoose'

/* PullObjectSchema will correspond to a collection in your MongoDB database. */
const PullObjectSchema = new mongoose.Schema({
  name: {
    /* Object Name */
    type: String,
    unique: true,
    required: [true, 'Please provide a name.'],
  },
  type: {
    /* The object type */

    type: String,
    required: [true, "Please provide a type."]
  },
  rating: {
    /* Object rating (3,4 or 5) */

    type: Number,
    default: 3,
    required: [true, "Please provide a rating."]
  },
  element: {
    /* Element (for figure only) */
    type: String
  },
  wp_type: {
    /* weapon type */

    type: String,
    required: [true, "Please provide a weapon type."]
  },
  obtained_from: {
    /* obtained from */

    type: String
  },
  image_url: {
    /* Url to pet image */
    type: String,
  },
})

export default mongoose.models.PullObject || mongoose.model('PullObject', PullObjectSchema)
