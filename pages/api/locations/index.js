import apiHandler from '../../../lib/apiHandler'
import Model from '../../../models/Location'

export default async function handler(req, res) {
    await apiHandler(Model, req, res)
}