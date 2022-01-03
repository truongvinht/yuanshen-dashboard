import dbConnect from '../../../lib/dbConnect'
import Element from '../../../models/Element'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const objs = await Element.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: objs })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const obj = await Element.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: obj })
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
