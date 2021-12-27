import Link from 'next/link'
import styles from '../styles/Actionbar.module.css'

const Actionitem = ({param_ref, param_as, param_title, isEdit = true}) => {
    return (
        <Link href={param_ref} as={param_as}>
            <button className=
            {[styles.btn, isEdit?styles.classic:styles.delete].join(' ')}
            >{param_title}</button>
        </Link>
    );
};

export default Actionitem