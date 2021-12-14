import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import PullObject from '../../../models/PullObject'

/* Allows you to view pet card info and delete pet card*/
const PullObjectPage = ({ obj }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const objID = router.query.id

    try {
      await fetch(`/api/objects/${objID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the obj.')
    }
  }

  return (
    <div key={obj._id}>
      <div className="card">
        <img src={obj.image_url} />
        <h5 className="pet-name">{obj.name}</h5>
        <div className="main-content">
          <p className="pet-name">{obj.name}</p>
          <p className="owner">Element: {obj.element}</p>

          <div className="btn-container">
            <Link href="/objects/[id]/edit" as={`/objects/${obj._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const obj = await PullObject.findById(params.id).lean()
  obj._id = obj._id.toString()

  return { props: { obj } }
}

export default PullObjectPage
