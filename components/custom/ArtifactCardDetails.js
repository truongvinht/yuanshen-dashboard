import objCardStyles from '../../styles/ObjectCard.module.css'
import Link from 'next/link'

// custom artifact card details
const ArtifactCardDetails = ({ card }) => {

    let dungeonName = '';
    let dungeonImageUrl = '';

    let dungeonImg = null;
    if (Object.prototype.hasOwnProperty.call(card, 'dungeon')) {
        dungeonName = card.dungeon.name;
        dungeonImageUrl = card.dungeon.image_url
        dungeonImg = (<img className={objCardStyles.domain_img} src={dungeonImageUrl} />)
    } else {
        dungeonImg = (<div />);
    }

    if (card.max_rating === 5) {

        let artifactDesc = card.four_set

        if (artifactDesc.length > 180) {
            artifactDesc = artifactDesc.substring(0, 180) + "..."
        }

        return (
            <div key={'Card_Details_' + card._id} className={objCardStyles.main_content}>
            <div className={objCardStyles.artifact_details}>
                <p className={objCardStyles.artifact_title}>2er Set</p>
                <p className={objCardStyles.artifact_description}>{card.two_set}</p>
                <p className={objCardStyles.artifact_title}>4er Set</p>
                <p className={objCardStyles.artifact_description}>{artifactDesc}</p>
                <Link href="/artifacts/[id]" as={`/artifacts/${card._id}`}>
                    <a className={objCardStyles.artifact_title}>Details</a>
                </Link>
            </div>
            {dungeonImg}
            <p className={objCardStyles.domain_title}>{dungeonName}</p>
            </div>
        );
    } else {
        return (
            <div key={'Card_Details_' + card._id} className={objCardStyles.main_content}>
                <p className={objCardStyles.card_name}>{card.name}</p>
            </div>
        );
    }

};

export default ArtifactCardDetails