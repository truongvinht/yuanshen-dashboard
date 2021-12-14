import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import PullObject from '../models/PullObject'

const Index = ({ pullObjects }) => (
  <>
    {/* Create a card for each pet */}
    {pullObjects.map((obj) => (
      <div key={obj._id}>
        <div className={"card " + (obj.rating === 5 ? 'card-gold' : (obj.rating === 4 ? 'card-purple' : ''))}>
          <img src={obj.image_url} />
          <h5 className="pet-name">{obj.name}</h5>
          <div className="main-content">
            <p className="pet-name">{obj.name}</p>
            <p className="owner">Element: {obj.element}</p>

            {/* Extra Pet Info: Likes and Dislikes */}
            <div className="likes info">
              <p className="label">Likes</p>
              <ul>
                <li>TEST </li>
              </ul>
            </div>
            <div className="dislikes info">
              <p className="label">Dislikes</p>
              <ul>
                <li>TEST </li>
              </ul>
            </div>

            <div className="btn-container">
              <Link href="/objects/[id]/edit" as={`/objects/${obj._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/objects/[id]" as={`/objects/${obj._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves pullObject(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await PullObject.find({}).sort([["rating", -1],["type",1],["name",1]])
  const pullObjects = result.map((doc) => {
    const pullObj = doc.toObject()
    pullObj._id = pullObj._id.toString()
    return pullObj
  })

  return { props: { pullObjects: pullObjects } }
}

export default Index
