import dbConnect from '../lib/dbConnect'
import PullObject from '../models/PullObject'
import ObjectCard from '../components/ObjectCard'
import objCardStyles from '../styles/ObjectCard.module.css'


const pullObjects = ({ pullObjects }) => (
    <>
    {/* Create a card for each pet */}
    <div className={objCardStyles.grid}>
    {pullObjects.map((obj) => (
      <ObjectCard obj={obj} /> 
    ))}
    </div>
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

export default pullObjects