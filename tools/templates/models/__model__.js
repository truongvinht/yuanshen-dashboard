import mongoose from 'mongoose'

/* __model__Schema will correspond to a collection in your MongoDB database. */
const __model__Schema = new mongoose.Schema({
    name: {
        /* __model__ name */
        type: String,
        unique: true,
        required: [true, 'Please provide a name for __model__.'],
      }
})

export default mongoose.models.__model__ || mongoose.model('__model__Model', __model__Schema)
