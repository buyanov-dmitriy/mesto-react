import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: 'Загрузка...', about: 'Загрузка...' });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }
  function closeAllPopups() {
    if (isEditAvatarPopupOpen) { handleEditAvatarClick() };
    if (isEditProfilePopupOpen) { handleEditProfileClick() };
    if (isAddPlacePopupOpen) { handleAddPlaceClick() };
    if (selectedCard.link !== '') { setSelectedCard({ name: '', link: '' }) };
  }
  function handleUpdateUser(userInformation) {
    api.editProfile(userInformation)
      .then(newUserInformation => {
        setCurrentUser(newUserInformation);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(newUserInformation => {
        setCurrentUser(newUserInformation);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.putLike(card._id, !isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id)
      .then(result => {
        const newCards = cards.filter((c) => {
          return c._id !== card._id;
        })
        setCards(newCards);
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleAddPlace(card) {
    api.addNewCardToServer(card)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    Promise.all([api.getUserInformation(), api.getCards()])
    .then(([userInformation, cardsFromServer]) => {
      setCurrentUser(userInformation);
      setCards(cardsFromServer);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main isLoading={isLoading} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name='view-card' title='Вы уверены?' inputValue="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
