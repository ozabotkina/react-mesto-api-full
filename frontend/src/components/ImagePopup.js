import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        props.card.isOpen
          ? "popup image-popup popup_opened"
          : "popup image-popup"
      }
    >
      <div className="image-popup__wrap">
        <button
          className="popup__close-icon image-popup__close interactive"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="image-popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="image-popup__comment">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
