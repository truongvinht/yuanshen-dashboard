import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'><a>Übersicht</a></Link>
                </li>
                <li>
                    <Link href='/objects'><a>Objekte</a></Link>
                </li>
                <li>
                    <Link href='/locations'><a>Regionen</a></Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav