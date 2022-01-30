import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import EditHeader from './EditHeader'
import EditForm from './EditForm'

const PullForm = ({ formId, pullObjects = [], isSinglePull = true}) => {
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
  const [objectRef0, setObjectRef0] = useState('')
  const [objectRef1, setObjectRef1] = useState('')
  const [objectRef2, setObjectRef2] = useState('')
  const [objectRef3, setObjectRef3] = useState('')
  const [objectRef4, setObjectRef4] = useState('')
  const [objectRef5, setObjectRef5] = useState('')
  const [objectRef6, setObjectRef6] = useState('')
  const [objectRef7, setObjectRef7] = useState('')
  const [objectRef8, setObjectRef8] = useState('')
  const [objectRef9, setObjectRef9] = useState('')
  
  const objMap = {
      'eventTime':eventTime,
      'object_ref_0':objectRef0,
      'object_ref_1':objectRef1,
      'object_ref_2':objectRef2,
      'object_ref_3':objectRef3,
      'object_ref_4':objectRef4,
      'object_ref_5':objectRef5,
      'object_ref_6':objectRef6,
      'object_ref_7':objectRef7,
      'object_ref_8':objectRef8,
      'object_ref_9':objectRef9,
      'banner':banner,
      'uid':uid
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
  const postData = async (objList) => {
    try {

      for (let objForm of objList) {
        console.log(objForm)
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
      }


      // create next one
      router.push('/pulls')
      setMessage(`Pull created!`)
    } catch (error) {
      setMessage('Failed to add pull')
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
    if (key === '2. Ziehung') {
      setObjectRef1(target.value)
    }
    if (key === '3. Ziehung') {
      setObjectRef2(target.value)
    }
    if (key === '4. Ziehung') {
      setObjectRef3(target.value)
    }
    if (key === '5. Ziehung') {
      setObjectRef4(target.value)
    }
    if (key === '6. Ziehung') {
      setObjectRef5(target.value)
    }
    if (key === '7. Ziehung') {
      setObjectRef6(target.value)
    }
    if (key === '8. Ziehung') {
      setObjectRef7(target.value)
    }
    if (key === '9. Ziehung') {
      setObjectRef8(target.value)
    }
    if (key === '10. Ziehung') {
      setObjectRef9(target.value)
    }
  }
  /*forNewObject ? postData(objForm) : putData(objForm)*/
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
        
      if (isSinglePull) {
        postData([{
          ...objForm,
          ['object_ref']: objectRef0,
          ['order_index']:0
        }])
      } else {
        let objList = []
        for (let i=0;i<10;i = i + 1) {
          objList.push({
            ...objForm,
            ['object_ref']:objMap[`object_ref_${i}`],
            ['order_index']: i
          })
        }

        postData(objList)
      }
        
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure object info is filled for object name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!banner) err.banner = 'Banner is required'
    if (!uid) err.uid = 'UID is required'
    if (!objectRef0) err.objectRef0 = 'First pull is required'
    if(!isSinglePull) {
      if (!objectRef1) err.objectRef1 = '2nd pull is required'
      if (!objectRef2) err.objectRef2 = '3rd pull is required'
      if (!objectRef3) err.objectRef3 = '4th pull is required'
      if (!objectRef4) err.objectRef4 = '5th pull is required'
      if (!objectRef5) err.objectRef5 = '6th pull is required'
      if (!objectRef6) err.objectRef6 = '7th pull is required'
      if (!objectRef7) err.objectRef7 = '8th pull is required'
      if (!objectRef8) err.objectRef8 = '9th pull is required'
      if (!objectRef9) err.objectRef9 = '10th pull is required'
    }
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

  let headerString = 'Ziehung';
  let numPulls = 1;
  if (!isSinglePull) {
    // multi pull
    numPulls = 10;
    headerString = 'Ziehungen'
  }

  let options = [{'value':'','text':''}]
  pullObjects.map((obj) => (
    options.push({'value':obj._id, 'text':obj.name})
  ))

  for (let ind=0;ind < numPulls; ind = ind + 1) {

    // Selection
    compList.push({
      name: `${ind+1}. Ziehung`,
      value: `object_ref_${ind}`,
      classType: 'enum',
      options: options
    })
  }

  return (
    <>
    <EditHeader headerTitle={headerString} isEditing={false}/>
    <EditForm formId={formId} columns={2} onChange={handleChange} handleSubmit={handleSubmit} components={compList}objForm={objMap}/>
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
