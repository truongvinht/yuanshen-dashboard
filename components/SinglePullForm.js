import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const SinglePullForm = ({ formId, pForm, pullObjects, forNewPull = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [pullForm, setPullForm] = useState({
    banner: pForm.banner,
    object_ref: pForm.object_ref,
    eventTime: pForm.time,
    uid: pForm.uid
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (pullForm) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/pulls/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(pullForm),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/pulls/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update object')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (pullForm) => {
    try {
      const res = await fetch('/api/pulls', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(pullForm),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      // create next one
      router.push('/newSinglePull')
      setMessage(`Entry for ${pullForm.banner} created!`)
    } catch (error) {
      setMessage('Failed to add object')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const name = target.name

    setPullForm({
      ...pullForm,
      [name]: target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
        forNewPull ? postData(pullForm) : putData(pullForm)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure object info is filled for object name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!pullForm.banner) err.banner = 'Banner is required'
    if (!pullForm.object_ref) err.pull = 'Pull is required'
    if (!pullForm.time) err.time = 'Time is required'
    return err
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>

        <label htmlFor="banner">Banner</label>
        <select
            name="banner"
            value={pullForm.banner}
            onChange={handleChange}
        >
            <option value=""></option>
            <option value="Neulinggebete">Neulinggebete</option>
            <option value="Figurenaktionsgebet">Figurenaktionsgebet</option>
            <option value="Waffenaktionsgebet">Waffenaktionsgebet</option>
            <option value="Standardgebet">Standardgebet</option>
        </select>


        <label htmlFor="object_ref">Ziehung</label>
        <select
            name="object_ref"
            value={pullForm.object_ref}
            onChange={handleChange}
        >
            <option value=""></option>
            {pullObjects.map((obj) => (
                <option key={obj._id} value={obj._id}>{obj.name}</option>
            ))}
        </select>

        <label htmlFor="eventTime">Zeit</label>
        <input
          type="datetime"
          name="eventTime"
          value={pullForm.eventTime}
          onChange={handleChange}
          required
        />

        <label htmlFor="uid">UID</label>
        <input
          type="text"
          name="uid"
          value={pullForm.uid}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default SinglePullForm
