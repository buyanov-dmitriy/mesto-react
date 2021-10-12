import { useContext } from 'react';
import Card from './Card';
import Spinner from './Spinner';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className="profile page__content">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
        <button type="button" onClick={props.onEditAvatar} className="profile__avatar-overlay"></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" onClick={props.onEditProfile} className="popup-open profile__edit-button"></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} className="popup-open profile__add-button"></button>
      </section>
      <section className="elements page__content">
      {(props.isLoading)
          ? (<Spinner />)
          : (props.cards).map(currentCard => {
            return (<Card
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              onCardClick={props.onCardClick}
              key={currentCard._id}
              card={currentCard} />)
          })}
      </section>
    </main>
  )
}

export default Main;
