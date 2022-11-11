import logoPath from "../images/Vector.svg";
import { Link, withRouter, useHistory } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="лого Место" />
      <div className="header__texts">
        <p className="header__mail">{props.mail}</p>
        <Link to={props.path} className="header__link" onClick={props.onClick}>
          {props.linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
