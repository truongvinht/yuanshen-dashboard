import headerStyles from '../styles/Header.module.css'

const Header = ({headerTitle}) => {
    return (
        <div>
            <h1 className={headerStyles.title}><span>{headerTitle}</span></h1>
        </div>
    );
};

export default Header