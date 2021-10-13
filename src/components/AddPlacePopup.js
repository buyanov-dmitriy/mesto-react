import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleAddPlaceSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink
    });
  }
  function handleChangeName(event) {
    setCardName(event.target.value);
  }
  function handleChangeLink(event) {
    setCardLink(event.target.value);
  }

  useEffect(() => {
    if (props.isOpen) {
      setCardName('');
      setCardLink('');
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} name='add-card' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} inputValue="Создать">
      <section className="popup__section">
        <input value={cardName} onChange={handleChangeName} type="text" className="popup__field" name="card-place" id="place" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__error place-error"></span>
      </section>
      <section className="popup__section">
        <input value={cardLink} onChange={handleChangeLink} type="url" className="popup__field" name="card-link" id="link" placeholder="Ссылка на картинку" required />
        <span className="popup__error link-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
