import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");


  React.useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen])


  function handleCardNameInput(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkInput(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardLink, cardName)

  }

  function handleClose() {
    props.onClose();
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      button="Создать"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="cardname"
        name="cardname"
        className="popup__name popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={cardName}
        onChange={handleCardNameInput}
        required
      />
      <span className="popup__error cardname-error popup__error_visible"></span>
      <input
        type="url"
        id="link"
        name="cardlink"
        className="popup__about popup__input"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={handleCardLinkInput}
        required
      />
      <span className="popup__error link-error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
