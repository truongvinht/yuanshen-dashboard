
import { useState } from "react"
import nookies from 'nookies'

const Login = ({ redirectPath }) => {
    const [password, setPassword] = useState("")
    return (
        <div className="w-1/3 max-w-sm mx-auto">
        <form>
          <label className="block">
            <span className="text-gray-700">Passwort</span>
            <input
              type="text"
              className="form-input mt-1 block w-full bg-gray-50"
              placeholder="Dein Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <button
            type="submit"
            className="mt-3 bg-green-400 text-white p-2 font-bold rounded hover:bg-green-600"
            onClick={(e) => {
                updateLoginCookie(e, password, redirectPath)
            }} >
            Anmelden
          </button>
        </form>
      </div>
    );
};

const updateLoginCookie = (e, password, path) => {
    e.preventDefault()
    // Set
    nookies.set(null, 'ys_login_pwd', password, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })
    //   const cookies = new Cookies()
    //   cookies.set(consts.SiteReadCookie, password, {
    //     path: "/",
    //   })
    window.location.href = path ?? "/";
    console.log('Go to');

    console.log(path);
};

export default Login