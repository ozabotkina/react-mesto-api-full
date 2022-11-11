import React from "react";
import EntranceForm from "./EntranceForm";
import { authorize } from "../utils/Auth.js";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");
          props.handleLogin();
          props.history.push("/");
        } else {
          props.onFail();
        }
      })

      .catch((err) => {
        console.log(err);
        props.onFail();
      });
  }

  return (
    <EntranceForm
      title="Вход"
      button="Войти"
      link=""
      linkPath=""
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        className="signin__input"
        placeholder="Email"
        required
      />
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        className="signin__input"
        placeholder="Пароль"
        required
      />
    </EntranceForm>
  );
}

export default withRouter(Login);
