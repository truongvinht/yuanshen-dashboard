import Form from '../../components/BossForm'
import Login from '../../components/Login'
import nookies from 'nookies'
import securityChecker from '../../lib/securityChecker'

const NewBoss = ({hasReadPermission = false}) => {
  if (!hasReadPermission) {
    return <Login redirectPath={'/bosses/new'} />
  }

  const bossForm = {
    name: '',
    description:'',
    type:'',
    image_url: '',
  }

  return <Form formId="add-boss-form" bossForm={bossForm} />
}

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  return { props: { hasReadPermission: securityChecker(cookies.ys_login_pwd)} }
}

export default NewBoss
