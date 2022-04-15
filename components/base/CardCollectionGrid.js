
import objCardStyles from '../../styles/ObjectCard.module.css'

const CardCollectionGrid = ({ cards }) => {
    return (
        <div key={'CardCollectionGrid'} className={objCardStyles.grid}>
            {cards}
        </div>
    );
};
export default CardCollectionGrid