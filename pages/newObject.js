import ObjectForm from '../components/ObjectForm'
import Login from '../components/Login'
import nookies from 'nookies'
import securityChecker from '../lib/securityChecker'

const NewObject = ({hasReadPermission = false}) => {
  if (!hasReadPermission) {
    // return <div>Zugriff verweigert.</div>
    return <Login redirectPath={'/newObject'} />
  }

  const objectForm = {
    name: '',
    type: 'Figur',
    rating: 3,
    element: '',
    wp_type: '',
    obtained_from: '',
    image_url: ''
  }

  return <ObjectForm formId="add-object-form" objectForm={objectForm} />
}

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  return { props: { hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default NewObject
