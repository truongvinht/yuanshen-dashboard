import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import EditHeader from './EditHeader'
import EditForm from './EditForm'

const BossForm = ({ formId, bossForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    name: bossForm.name,
    description:bossForm.description,
    image_url: bossForm.image_url
  })

  // text fields
  const [name, setName] = useState(bossForm.name)
  const [description, setDescription] = useState(bossForm.description)
  const [image, setImage] = useState(bossForm.image_url)
  
  const objMap = {
      'name':name,
      'description':description,
      'image_url':image,
  }

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (objForm) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/bosses/${id}`, {
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

      mutate(`/api/bosses/${id}`, data, false) // Update the local data without a revalidation
      router.push('/bosses')
    } catch (error) {
      setMessage('Failed to update boss')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (objForm) => {
    try {
      const res = await fetch('/api/bosses', {
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
      router.push('/bosses/new')
      setMessage(`${objForm.name} created!`)
    } catch (error) {
      setMessage('Failed to add boss')
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
    if (key === 'Beschreibung') {
      setDescription(target.value)
      setObjForm({
        ...objForm,
        ['description']: target.value,
      })
    }
    if (key === 'Link zum Bild') {
      setImage(target.value)
      setObjForm({
        ...objForm,
        ['image_url']: target.value,
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
  // description
  compList.push({
    required: true,
    name: 'Beschreibung',
    type: 'text',
    maxLength: '64',
    value: 'description',
    classType: 'text'
  })

  // image
  compList.push({
    required: false,
    name: 'Link zum Bild',
    type: 'text',
    value: 'image_url',
    classType: 'text'
  })

  let headerString = 'Boss';

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

export default BossForm
