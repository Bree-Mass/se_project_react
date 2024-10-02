import React from "react";

function useFormAndValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const shortenedError = evt.target.validationMessage.slice(0, 43);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: shortenedError });
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
