import React from "react";
import EntranceForm from "./EntranceForm";
import { withRouter } from "react-router-dom";
import { register } from "../utils/Auth.js"

function Register(props) {
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
    register(email, password)
      .then(() => {
        props.history.push("/sign-in");
        props.onSuccess();
      })
      .catch((err) => {
        console.log(err);
        setEmail("");
        setPassword("");
        props.onFail();
      });
  }

  return (
    <EntranceForm
      title="Регистрация"
      button="Зарегистрироваться"
      link="Уже зарегистрированы? Войти"
      linkPath="/sign-in"
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
export default withRouter(Register);
