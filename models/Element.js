import mongoose from 'mongoose'

/* ElementSchema will correspond to a collection in your MongoDB database. */
const ElementSchema = new mongoose.Schema({
  name: {
    /* element name*/
    type: String,
    unique: true,
    required: [true, 'Please provide a name for Element.'],
  },
  image_url: {
    /* Url to element logo */
    type: String,
  },
  synergy: {
    /* element synergy*/
    type: String,
  },
  search_name: {
    /* search name*/
    type: String,
  }
})

export default mongoose.models.Element || mongoose.model('Element', ElementSchema)
