import targetApiHandler from '../../../lib/targetApiHandler'
import Model from '../../../models/Location'

export default async function handler(req, res) {
    await targetApiHandler(Model, req, res)
}
