import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import EditHeader from './EditHeader'
import EditForm from './EditForm'

const EditPullForm = ({ formId, pull}) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  
  const handleDelete = async () => {
    const objID = router.query.id
  
    try {
      await fetch(`/api/pulls/${objID}`, {
        method: 'Delete',
      })
      router.push('/pulls')
    } catch (error) {
      console.log("delete failed")
    }
  }

  const [objForm, setObjForm] = useState({
    eventTime: pull.eventTime.toString().substring(0, 19),
    object_ref: pull.object_ref,
    order_index: pull.order_index,
    banner: pull.banner,
    uid: pull.uid
  })

  // text fields
  const [banner, setBanner] = useState(objForm.banner)
  const [eventTime, setEventTime] = useState(objForm.eventTime)
  const [uid, setUid] = useState(objForm.uid)
  const [objectRef0, setObjectRef0] = useState(objForm.object_ref)
  
  const objMap = {
    'eventTime':eventTime,
    'banner':banner,
    'uid':uid,
    'object_ref_0':objectRef0
  }

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (objForm) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/pulls/${id}`, {
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

      mutate(`/api/pulls/${id}`, data, false) // Update the local data without a revalidation
      router.push('/pulls')
    } catch (error) {
      setMessage('Failed to update pull')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const key = target.name
    
    if (key === 'Banner') {
      setBanner(target.value)
      setObjForm({
        ...objForm,
        ['banner']: target.value,
      })
    }
    
    if (key === 'Zeit') {
      console.log(target.value)
      setEventTime(target.value)
      setObjForm({
        ...objForm,
        ['eventTime']: target.value,
      })
    }
    
    if (key === 'UID') {
      setUid(target.value)
      setObjForm({
        ...objForm,
        ['uid']: target.value,
      })
    }
    
    // check all pulls
    if (key === '1. Ziehung') {
      setObjectRef0(target.value)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()

    // check for any occured error
    if (Object.keys(errs).length === 0) {
        putData(objForm)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure object info is filled for object name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!banner) err.banner = 'Banner is required'
    if (!uid) err.uid = 'UID is required'
    return err
  }


  // prepare meta for form
  let compList = [];

  // Banner
  compList.push({
    name: 'Banner',
    value: 'banner',
    classType: 'enum',
    options: [
      {value: 'Standardgebete', text: 'Standardgebete'},
      {value: 'Figurenaktionsgebete', text: 'Figurenaktionsgebete'},
      {value: 'Waffenaktionsgebete', text: 'Waffenaktionsgebete'},
      {value: 'Neulinggebete', text: 'Neulinggebete'}
    ]
  })

  // event time
  compList.push({
    required: true,
    name: 'Zeit',
    type: 'datetime-local',
    value: 'eventTime',
    classType: 'datetime-local'
  })

  // uid
  compList.push({
    required: true,
    name: 'UID',
    type: 'text',
    maxLength: '32',
    value: 'uid',
    classType: 'text'
  })

  //pull
  compList.push({
    required: true,
    name: 'Ziehung',
    type: 'text',
    maxLength: '128',
    value: 'object_ref_0',
    classType: 'text'
  })
  let headerString = 'Ziehung';

  return (
    <div>
    <EditHeader headerTitle={headerString} isEditing={true}/>
    <EditForm formId={formId} onChange={handleChange} handleSubmit={handleSubmit} handleDelete={handleDelete} components={compList} objForm={objMap} />
    <p>{message}</p>
    <div>
      {Object.keys(errors).map((err, index) => (
        <li key={index}>{err}</li>
      ))}
    </div>
  </div>
  )
}

export default EditPullForm
