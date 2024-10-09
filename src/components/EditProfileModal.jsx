import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ModalWithForm from "./ModalWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfileModal({ isOpen, handleEdit }) {
  const CurrentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, isButtonDisabled } =
    useFormAndValidation(isOpen);

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    handleEdit(values);
  };

  React.useEffect(() => {
    if (isOpen) {
      resetForm({
        name: CurrentUser.name || "",
        avatar: CurrentUser.avatar || "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save changes"
      modalRefType="edit"
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleEditSubmit}
    >
      <label
        className={`modal__label ${errors.name ? "modal__error" : ""}`}
        htmlFor="name-edit"
      >
        Name*
        <input
          className="modal__input modal__input_name"
          type="text"
          name="name"
          id="name-edit"
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
        htmlFor="avatarUrl-edit"
      >
        Avatar URL*
        <input
          className="modal__input  modal__input_url"
          type="url"
          name="avatar"
          id="avatarUrl-edit"
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
