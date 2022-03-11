
import { mutate } from 'swr'

export async function createData(apiPath, dataModel, completionBlock = undefined) {
    const contentType = 'application/json'
    const REQUEST = 'POST'
    try {
        const res = await fetch(apiPath, {
            method: REQUEST,
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(dataModel),
        })

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }

        completionBlock(REQUEST, apiPath, dataModel, null)
    } catch (error) {
        completionBlock(REQUEST, apiPath, dataModel, error)
    }
}

export async function updateData(objId, apiPath, dataModel, completionBlock = undefined) {
    const contentType = 'application/json'
    const REQUEST = 'PUT'

    try {
        const res = await fetch(`${apiPath}/${objId}`, {
            method: REQUEST,
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(dataModel),
        })

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }

        const { data } = await res.json()

        mutate(`${apiPath}/${objId}`, data, false) // Update the local data without a revalidation
        completionBlock(REQUEST, apiPath, dataModel, null)
    } catch (error) {
        completionBlock(REQUEST, apiPath, dataModel, error)
    }
}

/* The DELETE method remove entry in the mongodb database. */
export async function eraseData(objId, apiPath, dataModel, completionBlock = undefined) {
    const REQUEST = 'DELETE'
    try {
        await fetch(`${apiPath}/${objId}`, {
            method: REQUEST,
        })

        completionBlock(REQUEST, apiPath, dataModel, null)
    } catch (error) {
        completionBlock(REQUEST, apiPath, dataModel, error)
    }
}

export default { createData, updateData, eraseData }