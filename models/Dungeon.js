import mongoose from 'mongoose'

/* DungeonSchema will correspond to a collection in your MongoDB database. */
const DungeonSchema = new mongoose.Schema({
    name: {
        /* dungeon name*/
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

export default mongoose.models.Dungeon || mongoose.model('Dungeon', DungeonSchema)
