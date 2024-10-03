import React from "react";
import { ModalContext } from "../contexts/ModalContext";
import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";
import "../blocks/RegisterModal.css";

function RegisterModal({ isOpen, handleRegistration }) {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const RegisterModalContext = React.useContext(ModalContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(values);
  };

  const handleFormReset = () => {
    if (isOpen) {
      resetForm();
    }
  };

  React.useEffect(() => {
    setIsButtonDisabled(!isValid);
  }, [isValid, RegisterModalContext.activeModal]);

  React.useEffect(() => {
    handleFormReset();
  }, [RegisterModalContext.activeModal]);

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign Up"
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
        className={`modal__label ${errors.registerName ? "modal__error" : ""}`}
        htmlFor="name-register"
      >
        Name*
        <input
          className="modal__input modal__input_name"
          type="text"
          name="name"
          id="name-register"
          value={values.registerName || ""}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.registerName ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.registerName})
        </span>
      </label>
      <label
        className={`modal__label ${errors.avatarUrl ? "modal__error" : ""}`}
        htmlFor="avatarUrl-register"
      >
        Avatar URL*
        <input
          className="modal__input  modal__input_url"
          type="url"
          name="avatarUrl"
          id="avatarUrl-register"
          value={values.avatarUrl || ""}
          placeholder="Avatar URL"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.avatarUrl ? "modal__validation_visible" : ""
          } modal__validation_register-avatar`}
        >
          ({errors.avatarUrl})
        </span>
      </label>
      <button className="modal__button_type_login" type="button">
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
