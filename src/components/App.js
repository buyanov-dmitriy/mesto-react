import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
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
    setSelectedCard({name: card.name, link: card.link});
  }
  function closeAllPopups() {
    if (isEditAvatarPopupOpen) {handleEditAvatarClick()};
    if (isEditProfilePopupOpen) {handleEditProfileClick()};
    if (isAddPlacePopupOpen) {handleAddPlaceClick()};
    if (selectedCard !== '') {setSelectedCard({name: '', link: ''})};
  }
  return (
    <div className='page'>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm name='edit-author' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} inputValue="Сохранить">
        <section className="popup__section">
          <input type="text" className="popup__field" name="author-name" id="name" required minLength="2" maxLength="40" placeholder="Имя" />
          <span className="popup__error name-error"></span>
        </section>
        <section className="popup__section">
          <input type="text" className="popup__field" name="author-description" id="description" required minLength="2" maxLength="200" placeholder="Занятие" />
          <span className="popup__error description-error"></span>
        </section>
      </PopupWithForm>
      <PopupWithForm name='add-card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} inputValue="Создать">
        <section className="popup__section">
          <input type="text" className="popup__field" name="card-place" id="place" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__error place-error"></span>
        </section>
        <section className="popup__section">
          <input type="url" className="popup__field" name="card-link" id="link" placeholder="Ссылка на картинку" required />
          <span className="popup__error link-error"></span>
        </section>
      </PopupWithForm>
      <PopupWithForm name='view-card' title='Вы уверены?' inputValue="Да"/>
      <PopupWithForm name='new-avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} inputValue="Создать">
        <section className="popup__section">
          <input type="url" className="popup__field" name="avatar" id="avatar" placeholder="Ссылка на аватар" required />
          <span className="popup__error link-error"></span>
        </section>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
