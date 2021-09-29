function ImagePopup(props) {
  return (
    <section className={`popup popup-view-card ${(props.card !== '') && `popup_opened`}`} id="popup-view-card">
      <div className="popup__open-card">
        <figure className="popup__picture">
          <img className="popup__image" src={props.card} alt="Архыз" />
          <figcaption className="popup__caption"></figcaption>
        </figure>
        <button onClick={props.onClose} className="popup__close" id="close-card" type="button"></button>
      </div>
    </section>
  )
}

export default ImagePopup;
