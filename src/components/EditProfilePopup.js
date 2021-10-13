import { useContext, useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(event) {
    setName(event.target.value);
  }
  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} name='edit-author' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} inputValue="Сохранить">
      <section className="popup__section">
        <input onChange={handleChangeName} type="text" className="popup__field" name="author-name" id="name" required minLength="2" maxLength="40" placeholder="Имя" value={name} />
        <span className="popup__error name-error"></span>
      </section>
      <section className="popup__section">
        <input onChange={handleChangeDescription} type="text" className="popup__field" name="author-description" id="description" required minLength="2" maxLength="200" placeholder="Занятие" value={description} />
        <span className="popup__error description-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
