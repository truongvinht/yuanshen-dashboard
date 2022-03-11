import mongoose from 'mongoose'

/* BossSchema will correspond to a collection in your MongoDB database. */
const BossSchema = new mongoose.Schema({
    name: {
        /* boss name */
        type: String,
        unique: true,
        required: [true, 'Please provide a name for Boss.'],
    },
    description: {
        /* boss description */
        type: String,
    },
    type: {
        /* boss type */
        type: String,
    },
    resin: {
        /* boss resin cost */
        type: Number,
    },
    location_id: {
        /* ref id boss */
        type: String,
    },
    image_url: {
        /* Url to boss logo */
        type: String,
    }
})

export default mongoose.models.Boss || mongoose.model('Boss', BossSchema)
