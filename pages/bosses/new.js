import Form from '../../components/BossForm'
import Login from '../../components/Login'
import Location from '../../models/Location'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'
import dbConnect from '../../lib/dbConnect' 

const NewBoss = ({locations = [], hasReadPermission = false}) => {
  if (!hasReadPermission) {
    return <Login redirectPath={'/bosses/new'} />
  }

  const bossForm = {
    name: '',
    description:'',
    location_id: '',
    type:'',
    image_url: '',
    locations: locations
  }

  return <Form formId="add-boss-form" bossForm={bossForm} />
}

export async function getServerSideProps(ctx) {
  // Parse
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

export default NewBoss
