function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }
  return (
    <div className="element-template__element">
      <button onClick={handleClick} className="popup-open element-template__open" id="open-card" type="button"><img className="element-template__picture" src={props.card.link} alt={props.card.name} /></button>
      <button className="element-template__trash" type="button"></button>
      <div className="element-template__group">
        <h2 className="element-template__title">{props.card.name}</h2>
        <button className="element-template__like" type="button"></button>
        <p className="element-template__like-count">{props.card.likes.length}</p>
      </div>
    </div>
  )
}

export default Card;
