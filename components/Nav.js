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
                    <Link href='/elements'><a>Elemente</a></Link>
                </li>
                <li>
                    <Link href='/bosses'><a>Bosse</a></Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav