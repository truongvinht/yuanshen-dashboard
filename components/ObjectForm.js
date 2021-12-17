import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const ObjectForm = ({ formId, objectForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    name: objectForm.name,
    type: objectForm.type,
    rating: objectForm.rating,
    element: objectForm.element,
    wp_type: objectForm.wp_type,
    image_url: objectForm.image_url
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (objForm) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/objects/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(objForm),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/objects/${id}`, data, false) // Update the local data without a revalidation
      router.push('/objects')
    } catch (error) {
      setMessage('Failed to update object')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (objForm) => {
    try {
      const res = await fetch('/api/objects', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(objForm),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      // create next one
      router.push('/newObject')
      setMessage(`${objForm.name} created!`)
    } catch (error) {
      setMessage('Failed to add object')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const name = target.name

    setObjForm({
      ...objForm,
      [name]: target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
        forNewObject ? postData(objForm) : putData(objForm)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure object info is filled for object name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!objForm.name) err.name = 'Name is required'
    if (!objForm.type) err.type = 'Type is required'
    if (!objForm.rating) err.rating = 'Rating is required'
    if (!objForm.wp_type) err.wp_type = 'Weapon Type is required'
    return err
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="64"
          name="name"
          value={objForm.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Type</label>
        <select
            name="type"
            value={objForm.type}
            onChange={handleChange}
        >
            <option value=""></option>
            <option value="Figur">Figur</option>
            <option value="Waffe">Waffe</option>
        </select>

        <label htmlFor="rating">Rating</label>
        <select
            name="rating"
            value={objForm.rating}
            onChange={handleChange}
        >
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
        </select>
        <label htmlFor="element">Element</label>
        <select
            name="element"
            value={objForm.element}
            onChange={handleChange}
        >
            <option value=""></option>
            <option value="Anemo">Anemo</option>
            <option value="Dendro">Dendro</option>
            <option value="Elektro">Elektro</option>
            <option value="Geo">Geo</option>
            <option value="Hydro">Hydro</option>
            <option value="Kryo">Kryo</option>
            <option value="Pyro">Pyro</option>
        </select>

        <label htmlFor="wp_type">Weapon Type</label>

        <select
            name="wp_type"
            value={objForm.wp_type}
            onChange={handleChange}
        >
            <option value=""></option>
            <option value="Einhand">Einhand</option>
            <option value="Zweihand">Zweihand</option>
            <option value="Stange">Stange</option>
            <option value="Bogen">Bogen</option>
            <option value="Katalysator">Katalysator</option>
        </select>

        <label htmlFor="obtained_from">Obtained from</label>
        <input
          type="text"
          name="obtained_from"
          checked={objForm.obtained_from}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={objForm.image_url}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default ObjectForm
