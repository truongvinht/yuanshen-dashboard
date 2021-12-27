import mongoose from 'mongoose'

/* LocationSchema will correspond to a collection in your MongoDB database. */
const LocationSchema = new mongoose.Schema({
  name: {
    /* location name*/
    type: String,
    unique: true,
    required: [true, 'Please provide a name for location.'],
  },
  image_url: {
    /* Url to location logo */
    type: String,
  }
})

export default mongoose.models.Location || mongoose.model('Location', LocationSchema)
