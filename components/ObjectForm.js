import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Header from './Header'
import EditForm from './EditForm'

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
    obtained_from: objectForm.obtained_from,
    wp_type: objectForm.wp_type,
    image_url: objectForm.image_url
  })

  // text fields
  const [name, setName] = useState(objectForm.name)
  const [from, setFrom] = useState(objectForm.obtained_from)
  const [image, setImage] = useState(objectForm.image_url)

  // enum fields
  const [type, setType] = useState(objectForm.type)
  const [rating, setRating] = useState(objectForm.rating)
  const [element, setElement] = useState(objectForm.element)
  const [wpType, setWpType] = useState(objectForm.wp_type)

  const objMap = {
    'name':name,
    'type':type,
    'rating':rating,
    'element':element,
    'obtained_from':from,
    'wp_type':wpType,
    'image_url':image
  }

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
      router.push('/objects/new')
      setMessage(`${objForm.name} created!`)
    } catch (error) {
      setMessage('Failed to add object')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const key = target.name

    if (key === 'Name') {
      setName(target.value)
    }
    if (key === 'Typ') {
      setType(target.value)
    }
    if (key === 'Rarität') {
      setRating(target.value)
    }
    if (key === 'Element') {
      setElement(target.value)
    }
    if (key === 'Waffentyp') {
      setWpType(target.value)
    }
    if (key === 'Erhalten durch') {
      setFrom(target.value)
    }
    if (key === 'Link zum Bild') {
      setImage(target.value)
    }
    setObjForm({
      ...objForm,
      [key]: target.value,
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

  let headerString = 'Objekt anlegen';

  if(!forNewObject) {
    headerString = 'Objekt bearbeiten'
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

  // type
  compList.push({
    name: 'Typ',
    value: 'type',
    classType: 'enum',
    options: [
      {value: '', text: ''},
      {value: 'Figur', text: 'Figur'},
      {value: 'Waffe', text: 'Waffe'}
    ]
  })

  // Rating
  compList.push({
    name: 'Rarität',
    value: 'rating',
    classType: 'enum',
    options: [
      {value: '3', text: '3 Sterne'},
      {value: '4', text: '4 Sterne'},
      {value: '5', text: '5 Sterne'}
    ]
  })

  // Element
  compList.push({
    name: 'Element',
    value: 'element',
    classType: 'enum',
    options: [
      {value: '', text: ''},
      {value: 'Anemo', text: 'Anemo'},
      {value: 'Dendro', text: 'Dendro'},
      {value: 'Elektro', text: 'Elektro'},
      {value: 'Geo', text: 'Geo'},
      {value: 'Hydro', text: 'Hydro'},
      {value: 'Pyro', text: 'Pyro'}
    ]
  })

  // Weapon Type
  compList.push({
    name: 'Waffentyp',
    value: 'wp_type',
    classType: 'enum',
    options: [
      {value: '', text: ''},
      {value: 'Einhand', text: 'Einhand'},
      {value: 'Zweihand', text: 'Zweihand'},
      {value: 'Stange', text: 'Stange'},
      {value: 'Bogen', text: 'Bogen'},
      {value: 'Katalysator', text: 'Katalysator'}
    ]
  })

  // obtained
  compList.push({
    required: false,
    name: 'Erhalten durch',
    type: 'text',
    value: 'obtained_from',
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

  return (
    <>
      <Header headerTitle={headerString}/>
      <EditForm formId={formId} onChange={handleChange} handleSubmit={handleSubmit} components={compList} objForm={objMap}/>
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


