import React from "react";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import "../blocks/toggleSwitch.css";

const ToggleSwitch = ({ isOn }) => {
  const currentTempContext = React.useContext(CurrentTempUnitContext);

  return (
    <>
      <input
        className="switch"
        id="switch"
        type="checkbox"
        checked={isOn}
        onChange={currentTempContext.handleToggleSwitchChange}
      />
      <label className="switch__label" htmlFor="switch">
        <p
          className={`switch__text switch__text_farenheit ${
            isOn ? "switch__text_farenheit_active" : ""
          }`}
        >
          F
        </p>
        <span className="switch__button" />
        <p
          className={`switch__text switch__text_celcius ${
            isOn
              ? "switch__text_celcius_active"
              : "switch__text_celcius_inactive"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
};

export default ToggleSwitch;
