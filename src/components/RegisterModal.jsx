import React from "react";
import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";
import "../blocks/RegisterModal.css";

function RegisterModal({
  activeModal,
  registerModalRef,
  formRef,
  handleCloseModal,
  isOpen,
  handleRegistration,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

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
  }, [isValid, activeModal]);

  React.useEffect(() => {
    handleFormReset();
  }, [activeModal]);

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      registerModalRef={registerModalRef}
      formRef={formRef}
      handleCloseModal={handleCloseModal}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleRegisterSubmit}
    >
      <label
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
        htmlFor="email"
      >
        Email*
        <input
          className="modal__input modal__input_email"
          type="email"
          name="email"
          id="email"
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
          ({errors.email.slice(0, 43)})
        </span>
      </label>
      <label
        className={`modal__label ${errors.password ? "modal__error" : ""}`}
        htmlFor="password"
      >
        Password*
        <input
          className="modal__input  modal__input_password"
          type="password"
          name="password"
          id="password"
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
        htmlFor="name"
      >
        Name*
        <input
          className="modal__input modal__input_name"
          type="text"
          name="registerName"
          id="registerName"
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
        htmlFor="avatarUrl"
      >
        Avatar URL*
        <input
          className="modal__input  modal__input_url"
          type="url"
          name="avatarUrl"
          id="avatarUrl"
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
    </ModalWithForm>
  );
}

export default RegisterModal;
