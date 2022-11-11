import { Card } from "../components/Сard.js";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const popupSelectors = {
  popupAuthorSelector: ".popup_author",
  popupAvatarSelector: ".popup_avatar",
  popupDeleteSelector: ".popup_delete-card",
  popupNewCardSelector: ".popup_new-card",
  popupImageSelector: ".image-popup",
};

export const userInfoSelectors = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
};

export const authorButton = document.querySelector(".edit-button");
export const newCardButton = document.querySelector(".add-button");
export const authorName = document.querySelector(".profile__name");
export const authorAbout = document.querySelector(".profile__about");
export const jobInput = document.querySelector(".popup__about");
export const nameInput = document.querySelector(".popup__name");
export const authorAvatar = document.querySelector(".profile__avatar");
export const avatarEdit = document.querySelector(".profile__avatar-wrap");

export function createCard(
  { link, name, likes, _id, owner },
  handleCardClick,
  handleTrashClick,
  handleLikeClick,
  myId
) {
  const card = new Card(
    { link, name, likes, _id, owner },
    "#card-element",
    handleCardClick,
    handleTrashClick,
    handleLikeClick,
    myId
  );

  return card.generateCard();
}
