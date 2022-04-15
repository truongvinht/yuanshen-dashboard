import dbConnect from '../../lib/dbConnect'
import PullObject from '../../models/PullObject'
import CardCollectionGrid from '../../components/base/CardCollectionGrid'
import ObjectCard from '../../components/custom/ObjectCard'
import Actionbar from '../../components/Actionbar'
import Header from '../../components/Header'


const pullObjects = ({ pullObjects, actions = {} }) => (
  <div>
    {/* Create a card for each pet */}
      <Header headerTitle={"Objekte"}/>
      <br />
    <Actionbar actions={actions} />
    <CardCollectionGrid cards={
      pullObjects.map((obj) => (
        <ObjectCard card={obj} />
      ))} />
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
  let actions = [{'param_ref':'/objects/new', 'param_as':'/objects/new', 'param_title':'Neu', isEdit:true}];


  actions = null;
  return { props: { pullObjects: pullObjects , actions: actions} }
}

export default pullObjects