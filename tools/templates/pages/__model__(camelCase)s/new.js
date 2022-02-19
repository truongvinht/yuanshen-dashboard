import Login from '../../components/Login'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'

const New__model__ = ({hasReadPermission = false}) => {
  if (!hasReadPermission) {
    // return <div>Zugriff verweigert.</div>
    return <Login redirectPath={'/__model__(camelCase)s/new'} />
  }

  const locationForm = {
    name: '',
    image_url: ''
  }

  return <div />
}

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  return { props: { hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default New__model__
