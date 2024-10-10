import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";
import "../blocks/LoginModal.css";

function LoginModal({ isOpen, handleLogin }) {
  const loginModalContext = React.useContext(ModalContext);

  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values);
  };

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Log In"
      modalRefType="login"
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleLoginSubmit}
    >
      <label
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
        htmlFor="email-login"
      >
        Email*
        <input
          className="modal__input modal__input_email"
          type="email"
          name="email"
          id="email-login"
          value={values.email || ""}
          placeholder="Email"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.email ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.email})
        </span>
      </label>
      <label
        className={`modal__label ${errors.password ? "modal__error" : ""}`}
        htmlFor="password-login"
      >
        Password*
        <input
          className="modal__input  modal__input_password"
          type="password"
          name="password"
          id="password-login"
          value={values.password || ""}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.password ? "modal__validation_visible" : ""
          } modal__validation_register-password`}
        >
          ({errors.password})
        </span>
      </label>

      <button
        id="register-modal"
        className="modal__button_type_register"
        type="button"
        onClick={loginModalContext.openModals}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
