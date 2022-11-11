import React from "react";

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          this.props.isOpen
            ? `popup popup_${this.props.name} popup_opened`
            : `popup popup_${this.props.name}`
        }
      >
        <button
          className="popup__close-icon interactive"
          type="button"
          onClick={this.props.onClose}
        ></button>
        <form
          className="popup__container popup__form"
          name={this.props.name}
          method="post"
          onSubmit={this.props.onSubmit}
        >
          <h2 className="popup__title">{this.props.title}</h2>
          {this.props.children}
          <button type="submit" className="popup__button">
            {this.props.button}
          </button>
        </form>
      </div>
    );
  }
}

export default PopupWithForm;
