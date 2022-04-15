import objCardStyles from '../../styles/ObjectCard.module.css'

// custom card details for genshin objects
const ObjectCardDetails = ({ card }) => {

    if (card.type === 'Waffe') {
        return (
            <div key={'Card_Details_' + card._id} className={objCardStyles.main_content}>
                <p className={objCardStyles.card_name}>{card.name}</p>
                <p className={objCardStyles.element}>Typ: {card.wp_type}</p>
            </div>
        );
    } else {
        return (
            <div key={'Card_Details_' + card._id} className={objCardStyles.main_content}>
                <p className={objCardStyles.card_name}>{card.name}</p>
                <p className={objCardStyles.element}>Element: {card.element}</p>
                <p className={objCardStyles.element}>Typ: {card.wp_type}</p>
            </div>
        );
    }

};

export default ObjectCardDetails