import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";
import "../blocks/RegisterModal.css";

function RegisterModal({ isOpen, handleRegistration, isLoading }) {
  const registerModalContext = React.useContext(ModalContext);
  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(values);
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText={isLoading ? "Signing Up..." : "Sign Up"}
      modalRefType="register"
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleRegisterSubmit}
    >
      <label
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
        htmlFor="email-regiser"
      >
        Email*
        <input
          className="modal__input modal__input_email"
          type="email"
          name="email"
          id="email-regiser"
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
        htmlFor="password-register"
      >
        Password*
        <input
          className="modal__input  modal__input_password"
          type="password"
          name="password"
          id="password-register"
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
      <label
        className={`modal__label ${errors.name ? "modal__error" : ""}`}
        htmlFor="name-register"
      >
        Name*
        <input
          className="modal__input modal__input_name"
          type="text"
          name="name"
          id="name-register"
          value={values.name || ""}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.name ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.name})
        </span>
      </label>
      <label
        className={`modal__label ${errors.avatar ? "modal__error" : ""}`}
        htmlFor="avatarUrl-register"
      >
        Avatar URL*
        <input
          className="modal__input  modal__input_url"
          type="url"
          name="avatar"
          id="avatarUrl-register"
          value={values.avatar || ""}
          placeholder="Avatar URL"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.avatar ? "modal__validation_visible" : ""
          } modal__validation_register-avatar`}
        >
          ({errors.avatar})
        </span>
      </label>
      <button
        id="login-modal"
        className={`modal__button_type_login ${
          isLoading ? "modal__button_type_login_loading" : ""
        }`}
        type="button"
        onClick={registerModalContext.openModals}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
