import objCardStyles from '../../../styles/ObjectCard.module.css'
const SimpleCard = ({ card }) => {
    return (
        <div key={card._id}>
            <div className={objCardStyles.card}>
            <h6 className={objCardStyles.card_name}>{card.name}</h6>
            </div>
        </div>
    );
};

export default SimpleCard