import React from "react";
import { v4 as uuidv4 } from "uuid";

function useFormAndValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      _id: prevValues._id || uuidv4(), // Create new _id if not already present
    }));
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormAndValidation;
