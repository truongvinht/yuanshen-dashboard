import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Header from './Header'
import EditForm from './EditForm'

const ElementForm = ({ formId, elementForm, forNewObject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    name: elementForm.name,
    image_url: elementForm.image_url,
    synergy: elementForm.synergy,
    search_name: elementForm.search_name,
  })

  // text fields
  const [name, setName] = useState(elementForm.name)
  const [image, setImage] = useState(elementForm.image_url)
  const [synergy, setSynergy] = useState(elementForm.synergy)
  const [search, setSearch] = useState(elementForm.search_name)
  
  const objMap = {
      'name':name,
      'image_url':image,
      'synergy':synergy,
      'search':search,
  }

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (objForm) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/elements/${id}`, {
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

      mutate(`/api/elements/${id}`, data, false) // Update the local data without a revalidation
      router.push('/elements')
    } catch (error) {
      setMessage('Failed to update element')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (objForm) => {
    try {
      const res = await fetch('/api/elements', {
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
      router.push('/elements/new')
      setMessage(`${objForm.name} created!`)
    } catch (error) {
      setMessage('Failed to add element')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const key = target.name
    
    if (key === 'Name') {
      setName(target.value)
      //setSearch(name.toLowerCase())
    }
    if (key === 'Link zum Bild') {
      setImage(target.value)
    }
    if (key === 'Synergy') {
      setSynergy(target.value)
    }
    setObjForm({
      ...objForm,
      [key]: target.value,
    })
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

  // image
  compList.push({
    required: false,
    name: 'Link zum Bild',
    type: 'text',
    value: 'image_url',
    classType: 'text'
  })

  // synergy
  compList.push({
    required: false,
    name: 'Synergy',
    type: 'text',
    maxLength: '256',
    value: 'synergy',
    classType: 'text'
  })

  let headerString = 'Element anlegen';

  if(!forNewObject) {
    headerString = 'Element bearbeiten'
  }

  return (
    <div>
    <Header headerTitle={headerString} />
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

export default ElementForm
