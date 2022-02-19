import dbConnect from '../../../lib/dbConnect'
import __model__ from '../../../models/__model__'

/* Allows you to view pet card info and delete pet card*/
const Edit__model__Page = ({ obj }) => {

  return (
    <div>
      <a>obj._id</a>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const obj = await __model__.findById(params.id).lean()
  obj._id = obj._id.toString()

  return { props: { obj } }
}

export default Edit__model__Page
