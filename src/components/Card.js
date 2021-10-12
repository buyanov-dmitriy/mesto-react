import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element-template__trash ${!isOwn ? 'element-template__trash_disabled' : ''}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element-template__like ${isLiked ? 'element-template__like_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card)
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element-template__element">
      <button onClick={handleClick} className="popup-open element-template__open" id="open-card" type="button"><img className="element-template__picture" src={props.card.link} alt={props.card.name} /></button>
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
      <div className="element-template__group">
        <h2 className="element-template__title">{props.card.name}</h2>
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
        <p className="element-template__like-count">{props.card.likes.length}</p>
      </div>
    </div>
  )
}

export default Card;
