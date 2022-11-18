import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  function handleClose() {
    props.onClose();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="alink"
        name="avatarlink"
        className="popup__name popup__input"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span className="popup__error alink-error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
