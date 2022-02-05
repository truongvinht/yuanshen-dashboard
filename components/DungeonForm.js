import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import EditHeader from './EditHeader'
import EditForm from './EditForm'

const DungeonForm = ({ formId, form, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    name: form.name,
    location_id: form.location_id,
    image_url: form.image_url
  })

  // text fields
  const [name, setName] = useState(form.name)
  const [locationId, setLocationId] = useState(form.location_id)
  const [image, setImage] = useState(form.image_url)
  
  const objMap = {
      'name':name,
      'location_id':locationId,
      'image_url':image
  }

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/dungeons/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/dungeons/${id}`, data, false) // Update the local data without a revalidation
      router.push('/dungeons')
    } catch (error) {
      setMessage('Failed to update dungeon')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/dungeons', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      // create next one
      router.push('/dungeons/new')
      setMessage(`${form.name} created!`)
    } catch (error) {
      setMessage('Failed to add element')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const key = target.name
    
    if (key === 'Name') {
      setName(target.value)
      setObjForm({
        ...objForm,
        ['name']: target.value,
        ['search']: target.value.toLowerCase(),
      })
    }
    if (key === 'Link zum Bild') {
      setImage(target.value)
      setObjForm({
        ...objForm,
        ['image_url']: target.value,
      })
    }
    if (key === 'Region') {
      setLocationId(target.value)
      setObjForm({
        ...objForm,
        ['location_id']: target.value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    
    // check for any occured error
    if (Object.keys(errs).length === 0) {
        forNewObject ? postData(objForm) : putData(objForm)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure object info is filled for object name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!name) err.name = 'Name is required'
    if (!locationId) err.name = 'Location is required'
    console.log(err)
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
    value: 'name',
    classType: 'text'
  })

  // location
  let options = [{'value':'','text':''}]
  form.locations.map((obj) => (
    options.push({'value':obj._id, 'text':obj.name})
  ))

  // Selection
  compList.push({
    name: `Region`,
    value: `location_id`,
    classType: 'enum',
    options: options
  })

  // image
  compList.push({
    required: false,
    name: 'Link zum Bild',
    type: 'text',
    value: 'image_url',
    classType: 'text'
  })

  let headerString = 'Spähre';

  return (
    <div>
    <EditHeader headerTitle={headerString} isEditing={!forNewObject}/>
    <EditForm formId={formId} onChange={handleChange} handleSubmit={handleSubmit} components={compList}objForm={objMap} />
    <p>{message}</p>
    <div>
      {Object.keys(errors).map((err, index) => (
        <li key={index}>{err}</li>
      ))}
    </div>
  </div>
  )
}

export default DungeonForm
