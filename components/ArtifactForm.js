import { useState } from 'react'
import { useRouter } from 'next/router'
import EditHeader from './EditHeader'
import EditForm from './EditForm'
import {postData, putData} from './../lib/apiEndpointWrapper'

const ArtifactForm = ({ formId, artifactForm, forNewObject = true }) => {

  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    name: artifactForm.name,
    one_set: artifactForm.one_set,
    two_set: artifactForm.two_set,
    four_set: artifactForm.four_set,
    image_url: artifactForm.image_url,
    dungeon_id: artifactForm.dungeon_id
  })

  // text fields
  const [name, setName] = useState(artifactForm.name)
  const [dungeonId, setDungeonId] = useState(artifactForm.dungeon_id)
  const [image, setImage] = useState(artifactForm.image_url)
  
  const objMap = {
      'name':name,
      'dungeon_id': dungeonId,
      'image_url':image,
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
    if (key === 'Spähre') {
      setDungeonId(target.value)
      setObjForm({
        ...objForm,
        ['dungeon_id']: target.value,
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
    const { id } = router.query
    
    const callback = function (requestType, apiPath, object, error) {
      if (error !== null) {
        setMessage(`Failed operation [${requestType}]: ${object} - ${error}`)
      } else {
        if (requestType === 'POST') {
          router.push('/artifacts/new')
        } else if(requestType === 'PUT') {
          router.push('/artifacts')
        } 
      }
    };

    // check for any occured error
    if (Object.keys(errs).length === 0) {
        forNewObject ? postData('/api/artifacts',objForm, callback) : putData(id,'/api/artifacts',objForm,callback)
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

  // dungeon
  let options = [{'value':'','text':''}]
  artifactForm.dungeons.map((obj) => (
    options.push({'value':obj._id, 'text':obj.name})
  ))

  // Selection
  compList.push({
    name: `Spähre`,
    value: `dungeon_id`,
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

  let headerString = 'Artifaktset';

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

export default ArtifactForm
