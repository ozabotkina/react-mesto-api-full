import { CurrentUserContext } from "../context/CurrentUserContext.js";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__trash interactive ${
    isOwn ? "" : "element__trash_inactive"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like interactive ${
    isLiked ? "element__like_active" : ""
  }`;

  const handleClick = () => {
    props.onCardClick(props.card);
  };
  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };
  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <div className="element" id={props.card._id}>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      />
      <div
        className="element__image"
        onClick={handleClick}
        style={{ backgroundImage: `url(${props.card.link})` }}
      />
      <div className="element__words">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-info">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
