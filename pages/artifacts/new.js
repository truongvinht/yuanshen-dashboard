import Form from '../../components/ArtifactForm'
import Login from '../../components/Login'
import Dungeon from '../../models/Dungeon'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'
import dbConnect from '../../lib/dbConnect' 

const NewArtifact = ({dungeons, hasReadPermission = false}) => {
  if (!hasReadPermission) {
    return <Login redirectPath={'/artifacts/new'} />
  }

  const form = {
    name: '',
    one_set: '',
    two_set: '',
    four_set: '',
    image_url: '',
    dungeon_id: '',
    dungeons: dungeons
  }

  return <Form formId="add-artifact-form" artifactForm={form} />
}

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  await dbConnect()

    /* find all the data in our database */
    const result = await Dungeon.find({}).sort([["id", 1]])
    const dungeons = result.map((doc) => {
      const loc = doc.toObject()
      loc._id = loc._id.toString()
      return loc
    })


  return { props: { dungeons: dungeons,hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default NewArtifact
