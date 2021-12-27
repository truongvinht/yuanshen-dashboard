import dbConnect from '../lib/dbConnect'
import PullObject from '../models/PullObject'
import ObjectCard from '../components/ObjectCard'
import objCardStyles from '../styles/ObjectCard.module.css'
import Actionbar from '../components/Actionbar'


const pullObjects = ({ pullObjects, actions = {} }) => (
  <div>
    {/* Create a card for each pet */}
    <Actionbar actions={actions} />
    <div className={objCardStyles.grid}>
      {pullObjects.map((obj) => (
        <ObjectCard obj={obj} />
      ))}
    </div>
  </div>
)

/* Retrieves pullObject(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await PullObject.find({}).sort([["rating", -1], ["type", 1], ["name", 1]])
  const pullObjects = result.map((doc) => {
    const pullObj = doc.toObject()
    pullObj._id = pullObj._id.toString()
    return pullObj
  })

  // actions
  let actions = [{'param_ref':'/newObject', 'param_as':'/newObject', 'param_title':'Neu', isEdit:true}];

  return { props: { pullObjects: pullObjects , actions: actions} }
}

export default pullObjects