import React from "react";
import yesPath from "../images/Union1.png";
import noPath from "../images/Union.png";

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `popup  popup_opened` : `popup`}>
      <button
        className="popup__close-icon interactive"
        type="button"
        onClick={props.onClose}
      ></button>
      <div className="popup__container">
        <img
          src={props.registrySuccess ? yesPath : noPath}
          alt={props.registrySuccess ? "получилось" : "не получилось"}
          className="popup__img"
        ></img>
        <p className="popup__text">
          {props.registrySuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
