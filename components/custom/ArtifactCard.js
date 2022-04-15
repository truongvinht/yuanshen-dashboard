import objCardStyles from '../../styles/ObjectCard.module.css'
import ArtifactCardDetails from './ArtifactCardDetails'

// custom artifact card
const ArtifactCard = ({ card }) => {
    return (
        <div key={card._id}>
            <div key={'card_artifact_'+card._id} className={getCardStyle(card)}>
              <img className={objCardStyles.custom_img50}src={card.image_url}/>
               <h6 className={objCardStyles.card_name}>{card.name}</h6>
               <ArtifactCardDetails card={card} />
           </div>
        </div>
    );
};

function getCardStyle(card) {
    let style = objCardStyles.card + ' ';

    switch(card.max_rating) {
        case 5: return style + objCardStyles.card_bg_weapon_5_star + ' ' + objCardStyles.card_gold;
        case 4: return style + objCardStyles.card_bg_weapon_4_star + ' ' + objCardStyles.card_purple;
        default: return style + objCardStyles.card_bg_weapon_3_star;
    }
}

export default ArtifactCard