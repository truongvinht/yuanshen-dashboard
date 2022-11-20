const LOGIN_PWD = process.env.LOGIN_PWD

if (!LOGIN_PWD) {
  console.log('Please define the LOGIN_PWD environment variable inside .env.local');
}

function securityChecker(pwd) {
   return pwd === LOGIN_PWD;
}

export default securityChecker
