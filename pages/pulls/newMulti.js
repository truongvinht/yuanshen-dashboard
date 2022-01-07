import dbConnect from '../../lib/dbConnect'
import PullObject from '../../models/PullObject'
import PullForm from '../../components/PullForm'

const NewMultiPull = ({ pullObjects }) => {
    return <PullForm formId="add-pull-form" pullObjects={pullObjects} isSinglePull={false} />
}

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await PullObject.find({}).sort([["rating", -1], ["type", 1], ["name", 1]])
    const pullObjects = result.map((doc) => {
      const pullObj = doc.toObject()
      pullObj._id = pullObj._id.toString()
      return pullObj
    })
  
    return { props: { pullObjects: pullObjects} }
}

export default NewMultiPull
