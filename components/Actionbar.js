import Actionitem from '../components/Actionitem'
import styles from '../styles/Actionbar.module.css'

const Actionbar = ({actions}) => {
    return (
        <div className={styles.btn_container}>
        {actions.map((obj) => (
          <Actionitem param_ref={obj.param_ref} param_as={obj.param_as} param_title={obj.param_title} isEdit={obj.isEdit} /> 
        ))}
        </div>
    );
};

export default Actionbar