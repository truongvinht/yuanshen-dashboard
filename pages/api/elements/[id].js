import dbConnect from '../../../lib/dbConnect'
import Element from '../../../models/Element'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const obj = await Element.findById(id)
        if (!obj) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: obj })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const obj = await Element.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!obj) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: obj })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedObject = await Element.deleteOne({ _id: id })
        if (!deletedObject) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
