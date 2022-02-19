import apiHandler from '../../../lib/apiHandler'
import Model from '../../../models/__model__'

export default async function handler(req, res) {
    await apiHandler(Model, req, res)
}
