import Form from '../../components/DungeonForm'
import Login from '../../components/Login'
import Location from '../../models/Location'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'
import dbConnect from '../../lib/dbConnect' 

const NewDungeon = ({locations = [], hasReadPermission = false}) => {
  if (!hasReadPermission) {
    return <Login redirectPath={'/dungeons/new'} />
  }

  const dungeonForm = {
    name: '',
    location_id: '',
    image_url: '',
    locations: locations
  }

  return <Form formId="add-dungeon-form" form={dungeonForm} />
}

export async function getServerSideProps(ctx) {
    // Parse cookie
    const cookies = nookies.get(ctx);

    await dbConnect()

    /* find all the data in our database */
    const result = await Location.find({}).sort([["id", 1]])
    const locations = result.map((doc) => {
      const loc = doc.toObject()
      loc._id = loc._id.toString()
      return loc
    })
  
    return { props: { locations: locations,hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default NewDungeon
