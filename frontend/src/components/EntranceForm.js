import React from "react";
import { Redirect, Route, Switch, Link, BrowserRouter } from "react-router-dom";

function EntranceForm(props) {
  return (
    <div className="signin">
      <form
        className="signin__form"
        name="signin"
        //   action={props.action}
        method="post"
        onSubmit={props.onSubmit}
      >
        <h2 className="signin__title">{props.title}</h2>

        {props.children}

        <button type="submit" className="signin__button">
          {props.button}
        </button>

        <Link className="signin__link" to={props.linkPath}>
          {props.link}
        </Link>
      </form>
    </div>
  );
}

export default EntranceForm;
