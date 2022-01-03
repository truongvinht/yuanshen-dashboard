import LocationForm from '../../components/LocationForm'
import Login from '../../components/Login'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'

const NewLocation = ({hasReadPermission = false}) => {
  if (!hasReadPermission) {
    // return <div>Zugriff verweigert.</div>
    return <Login redirectPath={'/locations/new'} />
  }

  const locationForm = {
    name: '',
    image_url: ''
  }

  return <LocationForm formId="add-location-form" locationForm={locationForm} />
}

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  return { props: { hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default NewLocation
