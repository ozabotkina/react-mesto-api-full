import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleClose() {
    props.onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, about);
  }

  return (
    <PopupWithForm
      name="author"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        name="popup__name"
        className="popup__name popup__input"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__error name-error popup__error_visible"></span>
      <input
        type="text"
        id="about"
        name="popup__about"
        className="popup__about popup__input"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleAboutChange}
        required
      />
      <span className="popup__error about-error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
