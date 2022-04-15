import objCardStyles from '../../styles/ObjectCard.module.css'
import ObjectCardDetails from './ObjectCardDetails'

// custom card for genshin objects
const ObjectCard = ({ card }) => {
    return (
        <div key={card._id}>
            <div key={'card_'+card._id} className={getCardStyle(card)}>
              <img src={card.image_url}/>
               <h6 className={objCardStyles.card_name}>{card.name}</h6>
               <ObjectCardDetails card={card} />
           </div>
        </div>
    );
};

function getCardStyle(card) {
    let style = objCardStyles.card + ' ';

    if (card.type === 'Waffe') {
        // weapon
        switch(card.rating) {
            case 5: return style + objCardStyles.card_bg_weapon_5_star + ' ' + objCardStyles.card_gold;
            case 4: return style + objCardStyles.card_bg_weapon_4_star + ' ' + objCardStyles.card_purple;
            default: return style + objCardStyles.card_bg_weapon_3_star;
        }
    } else {
        // figure
        switch(card.rating) {
            case 5: return style + objCardStyles.card_gold;
            case 4: return style + objCardStyles.card_purple;
            default: return style;
        }
    }
}

export default ObjectCard