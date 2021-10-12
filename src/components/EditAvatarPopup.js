import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarURL = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarURL.current.value,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name='new-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} inputValue="Создать">
      <section className="popup__section">
        <input ref={avatarURL} type="url" className="popup__field" name="avatar" id="avatar" placeholder="Ссылка на аватар" required />
        <span className="popup__error link-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
