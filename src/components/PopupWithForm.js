function PopupWithForm(props) {
  let inputValue;
  switch (props.name) {
    case 'confirmation-delete':
      inputValue = 'Да';
      break;
    case 'edit-author':
      inputValue = 'Сохранить';
      break;
    default:
      inputValue = 'Создать';
  }
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`} id={`popup-${props.name}`}>
      <form className="popup__container" name="popup-form" id={`form-${props.name}`} noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <input type="submit" className="popup__submit" value={inputValue} name="popup-submit" />
        <button onClick={props.onClose} className="popup__close" id={`close-${props.name}`} type="button"></button>
      </form>
    </section>
  )
}

export default PopupWithForm;
