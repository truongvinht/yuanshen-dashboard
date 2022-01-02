import Link from 'next/link'
import objCardStyles from '../styles/ObjectCard.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

const ObjectCard = ({obj, isEditing = false}) => {

  if (isEditing) {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const handleDelete = async () => {
      const objID = router.query.id
  
      try {
        await fetch(`/api/objects/${objID}`, {
          method: 'Delete',
        })
        router.push('/')
      } catch (error) {
        setMessage('Failed to delete the obj.')
      }
    }
    return (
      <div key={obj._id}>
        <div className={objCardStyles.card + ' ' + (obj.type === 'Waffe' ? (obj.rating === 5 ? objCardStyles.card_bg_weapon_5_star +' ':(obj.rating === 4 ? objCardStyles.card_bg_weapon_4_star +' ':objCardStyles.card_bg_weapon_3_star +' ')):'') + (obj.rating === 5 ? objCardStyles.card_gold : (obj.rating === 4 ? objCardStyles.card_purple : ''))}>
          <img src={obj.image_url} />
          <h6 className={objCardStyles.card_name}>{obj.name}</h6>
          <div className={objCardStyles.main_content}>
            <p className={objCardStyles.card_name}>{obj.name}</p>
            <p className={objCardStyles.element}>Element: {obj.element}</p>
            
            <div className={objCardStyles.btn_container}>
            <Link href="/objects/[id]/edit" as={`/objects/${obj._id}/edit`}>
              <button className=
              {[objCardStyles.btn, objCardStyles.edit].join(' ')}
              >Ändern</button>
            </Link>
            <button className=
              {[objCardStyles.btn, objCardStyles.delete].join(' ')} onClick={handleDelete}>Löschen
            </button>
            </div>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    );
  } else {

    return (
      <div key={obj._id}>
      <div className={objCardStyles.card + ' ' + (obj.type === 'Waffe' ? (obj.rating === 5 ? objCardStyles.card_bg_weapon_5_star +' ':(obj.rating === 4 ? objCardStyles.card_bg_weapon_4_star +' ':objCardStyles.card_bg_weapon_3_star +' ')):'') + (obj.rating === 5 ? objCardStyles.card_gold : (obj.rating === 4 ? objCardStyles.card_purple : ''))}>
        <img src={obj.image_url} />
        <h6 className={objCardStyles.card_name}>{obj.name}</h6>
        <div className={objCardStyles.main_content}>
          <p className={objCardStyles.card_name}>{obj.name}</p>
          <p className={objCardStyles.element}>Element: {obj.element}</p>

          {/* Extra Pet Info: Likes and Dislikes */}
          <div className={[objCardStyles.likes, objCardStyles.info].join(' ')}>
            <p className={objCardStyles.label}>Likes</p>
            <ul>
              <li>- </li>
            </ul>
          </div>
          <div className={[objCardStyles.dislikes, objCardStyles.info].join(' ')}>
            <p className={objCardStyles.label}>Dislikes</p>
            <ul>
              <li>- </li>
            </ul>
          </div>

          <div className={objCardStyles.btn_container}>
            <Link href="/objects/[id]/edit" as={`/objects/${obj._id}/edit`}>
              <button className=
              {[objCardStyles.btn, objCardStyles.edit].join(' ')}
              >Ändern</button>
            </Link>
            <Link href="/objects/[id]" as={`/objects/${obj._id}`}>
              <button className=
              {[objCardStyles.btn, objCardStyles.view].join(' ')}>Ansicht</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  }

};

export default ObjectCard