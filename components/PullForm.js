import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import EditHeader from './EditHeader'
import EditForm from './EditForm'

const PullForm = ({ formId, pullObjects, isSinglePull = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [objForm, setObjForm] = useState({
    eventTime: Date.now,
    object_ref: "",
    order_index:0,
    banner: "Standardgebete",
    uid: ""
  })

  // text fields
  const [banner, setBanner] = useState(objForm.banner)
  const [eventTime, setEventTime] = useState(objForm.eventTime)
  const [uid, setUid] = useState(objForm.uid)

  const [pObj, setPObj] = useState([])
  
  const objMap = {
      'eventTime':Date.now,
      'object_ref':"",
      'banner':"Standardgebete",
      'uid':""
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

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (objForm) => {
    try {
      const res = await fetch('/api/pulls', {
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
      router.push('/objects')
      setMessage(`Pull created!`)
    } catch (error) {
      setMessage('Failed to add pull')
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

  let headerString = 'Ziehung';

  return (
    <>
    <EditHeader headerTitle={headerString} isEditing={false}/>
    <EditForm formId={formId} onChange={handleChange} handleSubmit={handleSubmit} components={compList}objForm={objMap}/>
    <p>{message}</p>
    <div>
      {Object.keys(errors).map((err, index) => (
        <li key={index}>{err}</li>
      ))}
    </div>
  </>
  )
}

export default PullForm
