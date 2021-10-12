function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`} id={`popup-${props.name}`}>
      <form onSubmit={props.onSubmit} className="popup__container" name={`popup-form-${props.name}`} id={`form-${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <input type="submit" className="popup__submit" value={props.inputValue} name="popup-submit" />
        <button onClick={props.onClose} className="popup__close" id={`close-${props.name}`} type="button"></button>
      </form>
    </section>
  )
}

export default PopupWithForm;
