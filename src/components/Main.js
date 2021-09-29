import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import api from '../utils/api';
import Card from './Card';
import Spinner from './Spinner';

function Main(props) {
  const [[userName, userDescription, userAvatar], setUserInfo] = useState(['Загрузка...', 'Загрузка...', '']);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    api.getUserInformationAndCards()
      .then(([userInformation, cardsFromServer]) => {
        setUserInfo([userInformation.name, userInformation.about, userInformation.avatar]);
        setCards(cardsFromServer);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  return (
    <main className='content'>
      <section className="profile page__content">
        <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
        <button type="button" onClick={props.onEditAvatar} className="profile__avatar-overlay"></button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" onClick={props.onEditProfile} className="popup-open profile__edit-button"></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} className="popup-open profile__add-button"></button>
      </section>
      <section className="elements page__content">
        {isLoading
          ? <Spinner />
          : cards.map(currentCard => {
            return <Card onCardClick={props.onCardClick} key={currentCard._id} card={currentCard} />
          })}
      </section>
    </main>
  )
}

export default Main;
