import Form from '../../components/ElementForm'
import Login from '../../components/Login'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'

const NewElement = ({hasReadPermission = false}) => {
  if (!hasReadPermission) {
    return <Login redirectPath={'/elements/new'} />
  }

  const elementForm = {
    name: '',
    image_url: '',
    synergy: '',
    search_name: ''
  }

  return <Form formId="add-element-form" elementForm={elementForm} />
}

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  return { props: { hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default NewElement
