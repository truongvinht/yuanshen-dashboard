import { useState } from 'react'
import { useRouter } from 'next/router'
import EditHeader from './EditHeader'
import EditForm from './EditForm'
import {createData, updateData} from './../lib/apiEndpointWrapper'

const ElementForm = ({ formId, elementForm, forNewObject = true }) => {

  const router = useRouter()
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
  
  const objMap = {
      'name':name,
      'image_url':image,
      'synergy':synergy,
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
    if (key === 'Synergy') {
      setSynergy(target.value)
      setObjForm({
        ...objForm,
        ['synergy']: target.value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    const { id } = router.query
    
    const callback = function (requestType, apiPath, object, error) {
      if (error !== null) {
        setMessage(`Failed operation [${requestType}]: ${object} - ${error}`)
      } else {
        if (requestType === 'POST') {
          router.push('/elements/new')
        } else if(requestType === 'PUT') {
          router.push('/elements')
        } 
      }
    };

    // check for any occured error
    if (Object.keys(errs).length === 0) {
        forNewObject ? createData('/api/elements',objForm, callback) : updateData(id,'/api/elements',objForm,callback)
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

  let headerString = 'Element';

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

export default ElementForm
