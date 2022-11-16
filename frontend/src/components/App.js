import React from "react";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/api.js";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { checkToken } from "../utils/Auth.js"

function App(props) {
  // Все константы

  const [currentUser, setCurrentUser] = React.useState(
    {
    name: "Оля",
    avatar: "",
    about: "Учусь",
  }
  );

  const [cards, setCards] = React.useState([]);
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false,
  });
  const [loggedIn, setLoggedStatus] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [registrySuccess, setRegistrySuccess] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "", _id: "" });

  // Эффекты

  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    api
      .fetchInitialData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .fetchInitialCards()
      .then((cards) => {
        setCards(cards);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  // Все для логина и регистрации

  function handleLogin() {
    setLoggedStatus(true);
  }

  function showSuccess() {
    setRegistrySuccess(true);
    setInfoTooltipOpen(true);
  }

  function showFail() {
    setRegistrySuccess(false);
    setInfoTooltipOpen(true);
  }

  function handleLogout() {
    setLoggedStatus(false);
    localStorage.removeItem("token");
  }

  function tokenCheck() {
    const token = document.cookie.toString().replace('jwt=','');
    if (token) {
      checkToken(token)
        .then((data) => {

          if (data) {
            setUserData({ email: data.email, _id: data._id });
            setLoggedStatus(true);
            props.history.push("/");
          }
        })
        .catch((err) => console.log(err))
    }
  }

  // Обработчики попапов и апдейтов контента

  function handleAddPlaceClick() {
    setIsAddCardOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard({ link: card.link, name: card.name, isOpen: true });
  };

  const handleUserUpdate = (name, about) => {
    api
      .changeAuthorInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatarlink) => {
    api
      .changeAvatar(avatarlink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    const action = isLiked
      ? api.deleteLike(card._id)
      : api.createLike(card._id);

    action
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id !== card._id ? c : "")));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = (link, name) => {
    api
      .addNewCard(link, name)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function closeAllPopups() {
    setIsAddCardOpen(false);
    setIsEditProfileOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: "", name: "", isOpen: false });
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {loggedIn ? (
          <Header
            path={"/sign-in"}
            linkText={"Выйти"}
            onClick={handleLogout}
            mail={userData.email}
          />
        ) : (
          <></>
        )}

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={() => handleEditProfileClick()}
            onAddPlace={() => handleAddPlaceClick()}
            onEditAvatar={() => handleEditAvatarClick()}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>

          <Route path="/sign-in">
            <Header path="/sign-up" linkText="Регистрация" />
            <Login handleLogin={handleLogin} onFail={showFail} />
          </Route>

          <Route path="/sign-up">
            <Header path="/sign-in" linkText="Войти" />
            <Register onSuccess={showSuccess} onFail={showFail} />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        {loggedIn ? <Footer /> : <></>}

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddCardOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          button="Да"
          isOpen={false}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={() => closeAllPopups()} />
      </div>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        registrySuccess={registrySuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

