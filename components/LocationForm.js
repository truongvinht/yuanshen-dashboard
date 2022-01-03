import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Header from './Header'
import EditForm from './EditForm'

const LocationForm = ({ formId, locationForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    name: locationForm.name,
    image_url: locationForm.image_url
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (objForm) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/locations/${id}`, {
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

      mutate(`/api/locations/${id}`, data, false) // Update the local data without a revalidation
      router.push('/locations')
    } catch (error) {
      setMessage('Failed to update location')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (objForm) => {
    try {
      const res = await fetch('/api/locations', {
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
      router.push('/newLocation')
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
    return err
  }


  // prepare meta for form
  let compList = [];

  // name
  compList.push({
    required: true,
    name: 'Name',
    type: 'text',
    maxLength: '64',
    value: objForm.name,
    onChange: handleChange,
    classType: 'text'
  })

  // image
  compList.push({
    required: false,
    name: 'Link zum Bild',
    type: 'text',
    value: objForm.image_url,
    onChange: handleChange,
    classType: 'text'
  })

  let headerString = 'Region anlegen';

  if(!forNewObject) {
    headerString = 'Region bearbeiten'
  }

  return (
    <>
    <Header headerTitle={headerString}/>
    <EditForm formId={formId} handleSubmit={handleSubmit} components={compList}/>
    <p>{message}</p>
    <div>
      {Object.keys(errors).map((err, index) => (
        <li key={index}>{err}</li>
      ))}
    </div>
  </>
  )
}

export default LocationForm
