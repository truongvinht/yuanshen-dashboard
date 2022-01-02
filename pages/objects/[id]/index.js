import dbConnect from '../../../lib/dbConnect'
import PullObject from '../../../models/PullObject'
import ObjectCard from '../../../components/ObjectCard'

/* Allows you to view pet card info and delete pet card*/
const PullObjectPage = ({ obj }) => {

  return (
    <div>
      <ObjectCard obj={obj} isEditing={true}/>
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
