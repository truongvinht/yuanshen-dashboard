const TOKEN = process.env.TOKEN

if (!TOKEN) {
  console.log('Please define the TOKEN environment variable inside .env.local');
}

function tokenValidator(pwd) {
   return pwd === TOKEN;
}

export default tokenValidator
